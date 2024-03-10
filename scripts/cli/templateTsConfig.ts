function createTsConfig(subModule: string) {
  const template = `
{
  "extends": "./../../tsconfig.base.json",
  "include": [
    "env.d.ts",
    "rollup.config.ts",
    "__tests__",
    "scripts",
    "src/**/*",
  ],
  "compilerOptions": {
    "outDir": "dist/lib",
    "declaration": false,
    "declarationMap": false,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "typeRoots": [
      "node_modules/@types",
      "../../node_modules/@types",
    ]
  }
}
  `;

  return template.trim();
}

function createDeclareTsConfig(subModule: string) {
  const template = ` 
{
  "$schema": "http://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "moduleResolution": "node",
    "target": "esnext",
    "module": "esnext",
    "lib": ["ESNEXT", "dom"],
    "strict": true,
    "declaration": true,
    "declarationMap": false,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "emitDeclarationOnly": true,
    "esModuleInterop": true,
    "stripInternal": true,
    "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "outDir": "dist/lib",
    "useUnknownInCatchVariables": false,
    "typeRoots": ["node_modules/@types"]
  },
  "include": ["src/**/*", "env.d.ts"]
}  
  `;

  return template.trim();
}

export { createTsConfig, createDeclareTsConfig };
