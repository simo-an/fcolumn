import { execSync } from "child_process"
import { existsSync, readFileSync } from "fs"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import { parse } from 'yaml'

//Usage: pnpm run build-proj PACKAGE_NAME --dev[--doc|--api|--help]
//       pnpm run build-proj --help

const modeMap: Record<string, {cmds: string[], usage: string}> = {
  env: {
    cmds: ['--dev', '-D', '--development'],
    usage: 'set build environment'
  },
  doc: {
    cmds: ['--doc', '--document'],
    usage: 'build document'
  },
  api: {
    cmds: ['--api'],
    usage: 'build api'
  },
  help: {
    cmds: ['-h', '-H', '--help'],
    usage: 'check commend help document'
  }
}

const isDev = modeMap.env.cmds.includes(process.argv[3])
const isDoc = modeMap.doc.cmds.includes(process.argv[3])
const isApi = modeMap.api.cmds.includes(process.argv[3])
const isHelp = modeMap.help.cmds.includes(process.argv[2])

if (isHelp) {
  const helpText = Object.entries(modeMap).map(([k, v]) => {
    return `
    pnpm run build-proj PACKAGE_NAME ${v.cmds.join("|")}
    ${v.usage}
    `
  }).join("")

  console.info(`
  Usage: pnpm run build PACKAGE_NAME --dev[--doc|--api|--help]
         pnpm run build --help

  ${helpText}
`)
  process.exit(0)
}

const project = process.argv[2]

if (!project) {
  console.error("no project, please check help: pnpm build-proj |--help")
  process.exit(1)
}

const __mode = isDev 
  ? "-dev" : isDoc 
  ? "-doc" : isApi 
  ? "-api" : "";
const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaces = parse(readFileSync(resolve(__dirname, "../pnpm-workspace.yaml")).toLocaleString())
const packages: string[] = workspaces.packages

let command = ""

if (packages.includes(project)) { // build workspace
  command = `pnpm -F=./${project} run build${__mode}`
} else {
  packages.some((pkg) => {
    const packageName = pkg.replace("*", project)
    const projectPath = resolve(__dirname, `../${packageName}`)
    const isExist = existsSync(projectPath)
  
    if (isExist) {
      command = `pnpm -F=./${packageName} run build${__mode}`
    }
    
    return isExist
  })
}

if (command) {
  console.warn('Executing command: ', command);
  execSync(command, { stdio: "inherit" })
}