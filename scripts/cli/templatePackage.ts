function createPackage(subModule: string, version: string) {
  const template = `
{
  "name": "@fcolumn/${subModule}",
  "version": "${version}",
  "description": "${subModule} module across fcolumn packages",
  "main": "dist/fcolumn-${subModule}.js",
  "module": "dist/fcolumn-${subModule}.esm.mjs",
  "types": "dist/${subModule}.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "tsx ./scripts/dev.ts",
    "build": "rm -rf dist/* && pnpm run build-bundle && pnpm run build-type && pnpm run build-api",
    "build-type": "tsc -p tsconfig.api.json",
    "build-bundle": "rollup --config rollup.config.mjs",
    "build-api": "tsx ./scripts/build-api.ts",
    "lint": "eslint --ext .ts src/**/*.ts",
    "format": "prettier --write --parser typescript src/**/*.ts"
  },
  "author": "June",
  "keywords": [
    "Four Column",
    "${subModule}",
    "fcolumn/${subModule}"
  ],
  "license": "MIT",
  "homepage": "https://github.com/simu/four-column",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/simu/four-column.git"
  },
  "bugs": {
    "url": "https://github.com/simu/four-column/issues"
  },
  "dependencies": {},
  "devDependencies": {
    "@microsoft/api-extractor": "^7.42.3"
  }
}
  `;

  return template.trim();
}

export { createPackage };
