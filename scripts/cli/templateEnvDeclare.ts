function createEnvDeclare(subModule: string) {
  const template = `
declare let __VERSION__: string;
declare let __BUILD_INFO__: string;
declare let __DEV__: boolean;
  `.trim();

  return template.trim();
}

export { createEnvDeclare };
