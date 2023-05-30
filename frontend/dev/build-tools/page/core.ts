import { createHash, randomBytes } from "node:crypto";
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, rmSync, readdirSync, existsSync, renameSync, lstatSync, unlinkSync, rmdirSync, mkdir } from "node:fs";
import { join as pathJoin, basename } from "node:path";
import { exec, execSync } from "node:child_process";
import { chdir, cwd } from "node:process";

import { load as HTMLLoad, CheerioAPI } from "cheerio";
import { minify } from "html-minifier";

export type AsyncCompilePromiseConstructor = Promise<[{ [key: string]: string; }, string, CheerioAPI]>;
export type CompilePromiseConstructor = Promise<[{ [key: string]: string }, string, CheerioAPI]>;
export type CompileResults = [{ [key: string]: string; }, string, CheerioAPI];

export const rmSubDir = (dir: string) => {
    readdirSync(dir).forEach((file) => {
        const target = pathJoin(dir, file);
        const stat_ = lstatSync(target);
        if (stat_.isDirectory()) {
            rmSubDir(target);
            rmdirSync(target);
        } else if (stat_.isFile()) {
            rmSync(target);
        } else if (stat_.isSymbolicLink()) {
            unlinkSync(target);
        } else {
            throw new Error(`Can't delete: ${target}`);
        }
    });
}

export const setupBuildDir = (workspace: string) => {
    const PWD = cwd();
    chdir(workspace);
    if (!existsSync("./build")) { mkdirSync("./build") } else { rmSubDir("./build") }
    if (!existsSync("./tmp")) { mkdirSync("./tmp") } else { rmSubDir("./tmp") }
    mkdirSync("./tmp/js");
    chdir(PWD);
}

export const TSCompile = (RELEASE: boolean, workspace: string): Promise<{ [key: string]: string }> => {
    return new Promise<{ [key: string]: string }>((resolve, reject) => {
        console.time("TypeScript build time");
        exec(`npx tsc --project ${pathJoin(workspace, './src/tsconfig.json')}`, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                let outfiles: { [key: string]: string } = {}
                Promise.all<null>(readdirSync(pathJoin(workspace, "./tmp/js")).map((file) => {
                    return new Promise((_resolve, _reject) => {
                        if (RELEASE) {
                            const target = pathJoin(workspace, "./build/", file);
                            exec(`npx uglifyjs --compress --output ${target} -- ${pathJoin(workspace ,"./tmp/js", file)}`, (error, stdout) => {
                                if (error) {
                                    _reject(error);
                                } else {
                                    const hash_js = createHash("md5");
                                    hash_js.update(readFileSync(target));
                                    let outfile = hash_js.digest("hex") + ".js";
                                    renameSync(target, pathJoin(workspace, "./build", outfile));
                                    outfiles[file] = outfile;
                                    _resolve(null);
                                }
                            });
                        } else {
                            const target = pathJoin(workspace, "./tmp/js", file);
                            const hash_js = createHash("md5");
                            hash_js.update(readFileSync(target));
                            let outfile = hash_js.digest("hex") + ".js";
                            copyFileSync(target, pathJoin(workspace, "./build", outfile));
                            outfiles[file] = outfile;
                            _resolve(null);
                        }
                    });
                })).then(() => {
                    console.timeEnd("TypeScript build time");
                    resolve(outfiles);
                }).catch(reject);
            }
        });
    });
}

export const TailwindCompile = (RELEASE: boolean, workspace: string, wait = false): string | Promise<string> => {
    if (wait) {
        console.time("Tailwind CSS build time");
        const target = pathJoin(workspace, "./tmp/page.tailwind.css");
        const command = `npx tailwindcss --input ${pathJoin(workspace, './src/tailwind-directives.css')} --output ${target} --config ${pathJoin(workspace, './tailwind.config.js')}${RELEASE ? ' --minify' : ''}`;
        try {
            execSync(command, { stdio: "ignore" });
        } catch(error) {
            throw error;
        }
        const hash_css = createHash("md5");
        hash_css.update(readFileSync(target));
        let css_name = hash_css.digest("hex") + ".css";
        copyFileSync(target, pathJoin(workspace, "./build", css_name));
        console.timeEnd("Tailwind CSS build time");
        return css_name;
    } else {
        return new Promise<string>((resolve, reject) => {
            console.time("Tailwind CSS build time");
            const target = pathJoin(workspace, "./tmp/page.tailwind.css");
            const command = `npx tailwindcss --input ${pathJoin(workspace, './src/tailwind-directives.css')} --output ${target} --config ${pathJoin(workspace, './tailwind.config.js')}${RELEASE ? ' --minify' : ''}`;
            exec(command, (error, stdout) => {
                if (error) {
                    reject(error);
                } else {
                    const hash_css = createHash("md5");
                    hash_css.update(readFileSync(target));
                    let css_name = hash_css.digest("hex") + ".css";
                    copyFileSync(target, pathJoin(workspace, "./build", css_name));
                    console.timeEnd("Tailwind CSS build time");
                    resolve(css_name);
                }
            });
        });
    }
}

export const HTMLLoader = (workspace: string) => {
    return new Promise<CheerioAPI>((resolve, reject) => {
        console.time("HTML load & replace (__replace attribute) time");
        const $ = HTMLLoad(readFileSync(pathJoin(workspace, "./src/page.html")));
        for (const __element of $(".__BUILD_replace")) {
            const element = $(__element);
            const __replace = element.attr("__replace");
            if (__replace) {
                try {
                    let spilt_point = __replace.indexOf("=");
                    element.attr(__replace.slice(0, spilt_point), __replace.slice(spilt_point + 1));
                    element.removeClass("__BUILD_replace");
                    if (element.attr("class") == "") {
                        element.removeAttr("class");
                    }
                } catch {
                    reject(new Error("__BUILD_replace: replace error"))
                }
            } else {
                reject(new Error("__BUILD_replace: replace error, __replace attribute not found"));
            }
        }
        console.timeEnd("HTML load & replace (__replace attribute) time");
        resolve($);
    });
}

export const AsyncCompile = (RELEASE: boolean, workspace: string): AsyncCompilePromiseConstructor => {
    return Promise.all([
        TSCompile(RELEASE, workspace),
        TailwindCompile(RELEASE, workspace),
        HTMLLoader(workspace),
    ]);
}

export const Compile = (RELEASE: boolean, workspace: string): CompilePromiseConstructor => {
    return Promise.all([
        TSCompile(RELEASE, workspace),
        HTMLLoader(workspace),
    ]).then((results) => {
        return [results[0], TailwindCompile(RELEASE, workspace, true) as string, results[1]];
    });
}

export const ERROR_PAGE = (RELEASE: boolean, workspace: string) => {
    return (results: CompileResults) => {
        const PWD = cwd();
        chdir(workspace)
        console.time("HTML replace source link time");
        const [js_files, css_name, $] = results;

        let from = "/";
        if (RELEASE) {
            from = "https://cdn.noonomyen.com/error-page/"
        }

        for (const __element of $(".__BUILD_javascript")) {
            let element = $(__element)
            const src = element.attr("src");
            if (src) {
                element.attr("src", from + js_files[basename(src)]);
                element.removeClass("__BUILD_javascript");
                if (element.attr("class") == "") {
                    element.removeAttr("class");
                }
            } else {
                throw new Error("__BUILD_javascript: replace error, attribute src not found");
            }
        }

        {
            const element = $(".__BUILD_tailwindcss");
            element.attr("href", from + css_name);
            element.removeClass("__BUILD_tailwindcss");
            if (element.attr("class") == "") {
                element.removeAttr("class");
            }
        }

        const hash_random = createHash("sha256");
        hash_random.update(randomBytes(256));
        const temp_title_name = hash_random.digest("hex");
        $("html head title").replaceWith(`<title>${temp_title_name}</title>`);

        let out_html = $.html().replace(`<title>${temp_title_name}</title>`, "<title><!--#echo var=\"status\" --></title>");

        if (RELEASE) {
            out_html = minify(out_html, {
                removeAttributeQuotes: true,
                removeComments: false,
                sortClassName: true,
                sortAttributes: true,
                collapseWhitespace: true
            });
        }

        writeFileSync("./build/internal.error-page.html", out_html);

        chdir(PWD);
        console.timeEnd("HTML replace source link time");
    }
}

export const Target = {
    ERROR_PAGE
}
