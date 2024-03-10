import esbuild, { PluginBuild } from "esbuild";
import { resolve, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import minimist from "minimist";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const args = minimist(process.argv.slice(2));
const target = args._[0] || "main";
const format = args.f || "esm";
const pkg = require(`../packages/${target}/package.json`);

console.warn(`target: ${target}, format: ${format}`);

let outputFormat = format;
if (outputFormat !== "iife") {
  outputFormat = "esm";
}

const isESM = outputFormat === "esm";

const relativeFilePath = `../packages/${target}/dist/fcolumn-${target}${format === "iife" ? "" : "." + format}.${isESM ? "m" : ""}js`;

const outFile: string = resolve(__dirname, relativeFilePath);
const relativeOutFile = relative(process.cwd(), outFile);

const external: string[] = [
  ...Object.keys({
    ...pkg.dependencies,
  }),
];

const plugins = [
  {
    name: "log-rebuild",
    setup(build: PluginBuild) {
      let buildStart = -1;
      build.onStart(() => {
        buildStart = Date.now();
      });
      build.onEnd(() => {
        console.log(`built: ${relativeOutFile} \x1B[32m${Date.now() - buildStart}ms\x1B[0m`);
      });
    },
  },
];

esbuild
  .context({
    entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
    outfile: outFile,
    bundle: true,
    external,
    sourcemap: true,
    format: outputFormat,
    globalName: pkg.buildOptions?.name,
    platform: format === "cjs" ? "node" : "browser",
    plugins,
    target: ["chrome90"],
    define: {
      __VERSION__: `"${pkg.version}"`,
      __DEV__: `true`,
      __BUILD_INFO__: `"${pkg.version}(${new Date().toLocaleString()})"`,
      __ESM__: String(isESM),
      __UMD__: `false`,
    },
  })
  .then((ctx) => ctx.watch());
