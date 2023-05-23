import { argv } from "node:process";
import { createHash, randomBytes } from "node:crypto";
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, rmSync, readdirSync, existsSync } from "node:fs";
import { join as pathJoin } from "node:path";
import { execSync } from "node:child_process";

import { load as HTMLLoad, Element as HTMLElement } from "cheerio";

let RELEASE = false;
if (argv.indexOf("--release") != -1) {
    RELEASE = true;
};

console.time("Build time");

if (!existsSync("./build")) {
    mkdirSync("./build");
};

execSync("npx tsc --project ./src/tsconfig.json");
const hash_js = createHash("md5");
hash_js.update(readFileSync("./dist/page.js"));
let js_name = hash_js.digest("hex") + ".js";
copyFileSync("./dist/page.js", pathJoin("./build", js_name));

execSync("npx tailwindcss --input ./src/tailwind-directives.css --output ./dist/page.tailwind.css --config ./tailwind.config.js");
const hash_css = createHash("md5");
hash_css.update(readFileSync("./dist/page.tailwind.css"));
let css_name = hash_css.digest("hex") + ".css";
copyFileSync("./dist/page.tailwind.css", pathJoin("./build", css_name));

const $ = HTMLLoad(readFileSync("./src/page.html"), { decodeEntities: true });

const RemoveClass = (arr: string, item: string): string => {
    return arr.split(" ").filter((value: string) => {
        return value != item;
    }).join(" ");
};

for (let element of $(".__BUILD_replace")) {
    let __replace = (element as HTMLElement).attribs["__replace"];
    if (__replace) {
        try {
            let spilt_point = __replace.indexOf("=");
            (element as HTMLElement).attribs[__replace.slice(0, spilt_point)] = __replace.slice(spilt_point + 1);
            let _class =  RemoveClass((element as HTMLElement).attribs["class"], "__BUILD_replace");
            if (_class == "") {
                delete (element as HTMLElement).attribs["class"];
            } else {
                (element as HTMLElement).attribs["class"] = _class;
            };
            delete (element as HTMLElement).attribs["__replace"];
        } catch {
            console.trace("__BUILD_replace: replace error");
        };
    } else {
        console.trace("__BUILD_replace: not found attribute '__replace'");
    };
};

let js = $(".__BUILD_javascript");
if (RELEASE) {
    js.attr("src", "https://cdn.noonomyen.com/error-page/" + js_name);
} else {
    js.attr("src", "/" + js_name);
};
js.removeClass("__BUILD_javascript");
if (js.attr("class") == "") {
    js.removeAttr("class");
};

let css = $(".__BUILD_tailwindcss");
if (RELEASE) {
    css.attr("href", "https://cdn.noonomyen.com/error-page/" + css_name);
} else {
    css.attr("href", "/" + css_name);
};
css.removeClass("__BUILD_tailwindcss");
if (css.attr("class") == "") {
    css.removeAttr("class");
};

const hash_random = createHash("sha256");
hash_random.update(randomBytes(256));
const temp_title_name = hash_random.digest("hex");
$("html head title").replaceWith(`<title>${temp_title_name}</title>`);

const out_html = $.html();
writeFileSync("build/internal.error-page.html", out_html.replace(`<title>${temp_title_name}</title>`, "<title><!--#echo var=\"status\" --></title>"));

readdirSync("build").forEach((file) => {
    if (!((file == js_name) || (file == css_name) || (file == "internal.error-page.html"))) {
        rmSync(pathJoin("./build", file));
    }
});

console.timeEnd("Build time");
