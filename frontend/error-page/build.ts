console.time("Build time");

const end = () => { console.timeEnd("Build time") };
const error = (err: Error) => { throw err };

import { argv } from "node:process";

import * as Core from "./core";

let RELEASE = false;
if (argv.indexOf("--release") != -1) {
    RELEASE = true;
}

const workspace = ".";

if (argv.indexOf("ts-wait") != -1) {
    Core.setupBuildDir(workspace);
    Core.Compile(RELEASE, workspace)
        .then(Core.Target.ERROR_PAGE(RELEASE, workspace))
        .then(end)
        .catch(error);
} else {
    Core.setupBuildDir(workspace);
    Core.AsyncCompile(RELEASE, workspace)
        .then(Core.Target.ERROR_PAGE(RELEASE, workspace))
        .then(end)
        .catch(error);
}