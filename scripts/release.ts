import { execSync } from "child_process";
import inquirer from "inquirer";
import { toStandardVersion } from "./utils";

import { fileURLToPath } from "url";

import { dirname, resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projects = ["packages/elements"];
const packages = projects.map((project) => `${project}/package.json`);

packages.push("package.json");

function getCurrentVersion(): string {
  return JSON.parse(readFileSync(resolve(__dirname, "../package.json")).toString()).version;
}

function createNextVersion() {
  const current = getCurrentVersion().split(".");
  const next = Number(current.at(-1)) + 1;

  current[current.length - 1] = next.toString();

  return current.join(".");
}

async function updateAppVersion(version: string) {
  packages.forEach((file) => {
    const packagePath = resolve(__dirname, `../${file}`);
    const content: { version: string } = JSON.parse(readFileSync(packagePath).toString());

    content.version = version;

    writeFileSync(packagePath, JSON.stringify(content, null, 2));
  });

  packages.forEach((file) => execSync(`git add ${file}`));
}

async function pushToRepository(version: string) {
  const { push } = await inquirer.prompt<{ push: boolean }>([
    {
      type: "confirm",
      name: "push",
      message: "是否push代码?",
    },
  ]);

  if (push) {
    execSync(`git commit -m "chore: update version to ${version}"`);
    execSync(`git tag v${version}`);
    execSync("git push origin --tags");
  }
}

async function buildProject() {
  const { build } = await inquirer.prompt<{ build: boolean }>([
    {
      type: "confirm",
      name: "build",
      message: "是否重新构建项目?",
    },
  ]);

  if (build) {
    execSync("pnpm run build", { stdio: "inherit" });
  }
}

async function publishToNpm() {
  const current = execSync("npm config get registry").toString().trim();

  const { publish } = await inquirer.prompt<{ publish: boolean }>([
    {
      type: "confirm",
      name: "publish",
      message: `是否发布到NPM: ${current}?`,
    },
  ]);

  if (publish) {
    projects.forEach((project) =>
      execSync(`npm publish ${project}/dist`, {
        stdio: "inherit",
      })
    );
  }
}

async function bootstrap() {
  console.info("正式版本参考: 0.0.1");
  console.info("其他版本参考: 0.0.1-beta.0 | 0.0.1-rc.0");

  const targetVersion = "";
  const nextVersion = createNextVersion();

  const { version } = targetVersion
    ? { version: targetVersion }
    : await inquirer.prompt<{ version: string }>([
        {
          type: "input",
          name: "version",
          message: `请输入要发布的版本:`,
          default: nextVersion,
        },
      ]);

  const standardVersion = toStandardVersion(version.trim() || nextVersion);

  await updateAppVersion(standardVersion);
  await pushToRepository(standardVersion);
  await buildProject();
  await publishToNpm();
}

void bootstrap();
