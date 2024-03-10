import esbuild, { PluginBuild } from "esbuild";
import { resolve, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const pkg = require(`../package.json`);

const outFile: string = resolve(__dirname, `../${pkg.module}`);
const relativeOutFile = relative(process.cwd(), outFile);

const external: any[] = [
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
        console.log(`built: ${relativeOutFile} [32m${Date.now() - buildStart}ms[0m`);
      });
    },
  },
];

esbuild
  .context({
    entryPoints: [resolve(__dirname, "../src/index.ts")],
    outfile: outFile,
    bundle: true,
    external,
    sourcemap: true,
    format: "esm",
    platform: "browser",
    plugins,
    target: ["chrome90"],
    define: {
      __VERSION__: `"${pkg.version}"`,
      __DEV__: `true`,
    },
  })
  .then((ctx) => ctx.watch());