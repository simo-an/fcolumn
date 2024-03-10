function createBuildScript(subModule: string) {
  const template = `
import { execSync } from "child_process";
import { writeFile, copyFileSync } from "fs";
import { resolve } from "path";
import pkg from "../package.json" assert { type: "json" };

function generateApiDeclaration() {
  execSync("npx tsc --project tsconfig.api.json", { stdio: "inherit" });

  console.info("generate api declaration...");

  execSync("npx api-extractor run --local --verbose --config ./scripts/api-extractor.json5", {
    stdio: "ignore",
  });

  execSync("rm -rf ./dist/lib", { stdio: "inherit" });
  execSync("rm ./dist/${subModule}.d.ts", { stdio: "inherit" });
  execSync("rm ./dist/tsdoc-metadata.json", { stdio: "inherit" });

  console.info("generate api declaration finished!");
}
function updateWorkspaceVersion(dependencies: Record<string, string>) {
  Object.entries(dependencies).forEach(([name, version]) => {
    if (version === "workspace:*") {
      dependencies[name] = pkg.version;
    }
  });

  return dependencies;
}

function generatePackage() {
  const template = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    main: pkg.main.replace("dist/", ""),
    module: pkg.module.replace("dist/", ""),
    types: "fcolumn-${subModule}.d.ts",
    declaration: true,
    author: pkg.author,
    keywords: pkg.keywords,
    license: pkg.license,
    repository: pkg.repository,
    bugs: pkg.bugs,
    homepage: pkg.homepage,
    dependencies: updateWorkspaceVersion(pkg.dependencies),
  };

  writeFile(
    resolve(__dirname, "../dist/package.json"),
    JSON.stringify(template, null, "\\t"),
    { encoding: "utf8" },
    (err) => console.log(err || \`write package.json, current version \${pkg.version}\`)
  );
}

function generateReadme() {
  copyFileSync(resolve(__dirname, "../README.md"), resolve(__dirname, "../dist/README.md"));
}

void generateApiDeclaration();
void generatePackage();
void generateReadme();
  `;

  return template.trim();
}

function createApiExtractor(subModule: string) {
  const template = `
{
  "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
  "mainEntryPointFilePath": "<projectFolder>/dist/lib/index.d.ts",
  "bundledPackages": [ ],
  "compiler": {
    "tsconfigFilePath": "<projectFolder>/tsconfig.api.json"
  },
  "apiReport": {
    "enabled": false
  },
  "docModel": {
    "enabled": false
  },
  "dtsRollup": {
    "enabled": true,
    "publicTrimmedFilePath": "<projectFolder>/dist/fcolumn-${subModule}.d.ts"
  },
  "tsdocMetadata": {
  },
  "messages": {
    "compilerMessageReporting": {
      "default": {
        "logLevel": "warning"
      }
    },
    "extractorMessageReporting": {
      "default": {
        "logLevel": "warning"
      },
      "ae-forgotten-export": {
        "logLevel": "warning",
        "addToApiReportFile": true
      }
    },
    "tsdocMessageReporting": {
      "default": {
        "logLevel": "warning"
      }
    }
  }
}
`;

  return template.trim();
}

export { createBuildScript, createApiExtractor };
