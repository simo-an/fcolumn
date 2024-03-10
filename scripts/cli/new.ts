let workspace = process.argv[2];
let subModule = process.argv[3];

if (!subModule) {
  if (workspace.includes("/")) {
    [workspace, subModule] = workspace.split("/");
  } else {
    subModule = workspace;
    workspace = "packages";
  }
}

console.warn(`workspace is: ${workspace}`);
console.warn(`subModule is: ${subModule}`);

if (!workspace) {
  throw new Error("please provide workspace!");
}
if (!subModule) {
  throw new Error("please provide subModule!");
}

import { mkdirSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createPackage } from "./templatePackage";
import { createReadme } from "./templateReadme";
import { createDeclareTsConfig, createTsConfig } from "./templateTsConfig";
import { createRollupConfig } from "./templateRollupConfig";
import { createEnvDeclare } from "./templateEnvDeclare";
import { createEntry } from "./templateEntry";
import { createApiExtractor, createBuildScript } from "./templateBuild";
import { createDevScript } from "./templateDev";
import pkg from "../../package.json" assert { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseDir = resolve(__dirname, `../../${workspace}/${subModule}`);

if (existsSync(baseDir) && subModule !== "test") {
  throw new Error(`SubModule: ${subModule} already exists!`);
}

mkdirSync(baseDir, { recursive: true });

const projectDirs = ["__tests__", "scripts", "src"];
const projectFiles = {
  "package.json": createPackage(subModule, pkg.version),
  "README.md": createReadme(subModule),
  "tsconfig.json": createTsConfig(subModule),
  "tsconfig.api.json": createDeclareTsConfig(subModule),
  "rollup.config.mjs": createRollupConfig(subModule),
  "env.d.ts": createEnvDeclare(subModule),
  "scripts/build-api.ts": createBuildScript(subModule),
  "scripts/dev.ts": createDevScript(subModule),
  "scripts/api-extractor.json5": createApiExtractor(subModule),
  "src/index.ts": createEntry(subModule),
  "__tests__/index.ts": "export {};",
};

projectDirs.forEach((dir) => {
  mkdirSync(resolve(baseDir, dir), { recursive: true });
});

Object.entries(projectFiles).forEach(([file, content]) => {
  writeFileSync(resolve(baseDir, file), content.trim());
});

console.info("done! please run: ");
console.info("--------------------");
console.info("pnpm i");
console.info(`pnpm -F=./${workspace}/${subModule} run build`);
console.info("--------------------");
