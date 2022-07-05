import { Plugin, runCommand } from "./gitline"
import commands from "./command"

async function main() {
  runCommand(commands as Record<string, Plugin>)
}

main().catch(console.error)
