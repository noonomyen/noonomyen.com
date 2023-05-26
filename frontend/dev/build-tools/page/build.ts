console.time("Build time");

const end = () => { console.timeEnd("Build time") };
const error = (err: Error) => { throw err };

import { argv } from "node:process";

import * as Core from "./core";

let RELEASE = false;
if (argv.indexOf("--release") != -1) {
    RELEASE = true;
}

if (argv.indexOf("target->error-page") != -1) {
    const workspace = "../../../error-page";
    Core.setupBuildDir(workspace);
    Core.Compile(RELEASE, workspace)
        .then(Core.Target.ERROR_PAGE(RELEASE, workspace))
        .then(end)
        .catch(error);
} else {
    console.log(`build.ts [target->] [option]
target:
    target->error-page    -- /frontend/error-page
option:
    --release             -- replace src link and minify`);
}
