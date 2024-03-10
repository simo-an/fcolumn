import { camelize } from "./utils";

function createEntry(subModule: string) {
  const funcName = camelize(`print-${subModule}`);
  const template = `
function ${funcName}() {
  console.info("${funcName}")
}

export { ${funcName} }
  `;

  return template.trim();
}

export { createEntry };
