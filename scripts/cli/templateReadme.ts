function createReadme(subModule: string) {
  const template = `
## Install

Install \`@fcolumn/${subModule}\` by \`pnpm\`

\`\`\`bash
pnpm add @fcolumn/${subModule}
\`\`\`
`;

  return template.trim();
}

export { createReadme };
