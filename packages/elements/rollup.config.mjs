import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import license from "rollup-plugin-license";
import resolve from "@rollup/plugin-node-resolve";
import process from "process";
import { defineConfig } from "rollup";
import pkg from "./package.json" assert { type: "json" };

const BUILD_INFO = `${pkg.version}(${new Date().toLocaleString()})`;

const isDev = process.env.BUILD === "development";

function createPlugins(type) {
  const isESMBundler = type === "esm-bundler";
  const isUMD = type === "umd";
  const isESM = type === "esm";

  const babelPlugins = isESMBundler ? [] : [["@babel/plugin-transform-runtime", { corejs: 3 }]];

  babelPlugins.push(
    ["@babel/plugin-transform-class-properties", { loose: true }],
    ["@babel/plugin-transform-private-methods", { loose: true }],
    ["@babel/plugin-transform-private-property-in-object", { loose: true }]
  );

  return [
    replace({
      __VERSION__: pkg.version,
      __BUILD_INFO__: BUILD_INFO,
      __DEV__: String(isDev),
    }),

    resolve({
      extensions: [".js", ".ts"],
      mainFields: ["browser", "jsnext:main", "module", "main"],
      preferBuiltins: false,
      preventAssignment: true,
    }),
    commonjs(),
    typescript({ tsconfig: "tsconfig.json" }),
    babel({
      extensions: [".js", ".ts", ".mjs"],
      babelHelpers: isESMBundler ? "bundled" : "runtime",
      include: ["src/**"],
      presets: [["@babel/preset-env"]],
      plugins: babelPlugins,
    }),
    !isDev && terser(),
    !isDev &&
      license({
        sourcemap: true,
        banner: `FourColumn-${BUILD_INFO} Copyright JuneInc.`,
      }),
  ];
}

const config = defineConfig([
  {
    input: "src/index.ts",
    output: {
      file: pkg.main,
      name: "FColumnElements",
      format: "umd",
      sourcemap: false,
    },
    plugins: createPlugins("umd"),
  },
  {
    input: "src/index.ts",
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: false,
    },
    external: [
      ...Object.keys({
        ...pkg.dependencies,
      }),
    ],
    plugins: createPlugins("esm-bundler"),
  },
]);

export default config;
