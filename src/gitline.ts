import inquirer from "inquirer";
import Configuration, { Choice } from "./config";

const enum Messages {
  Name = "name",
}
interface Config {
  [Messages.Name]: string
}
const defaults: Config = {
  [Messages.Name]: "Choose the command you want to execute",
}
const configuration = new Configuration<Config>("gitline", defaults)

type PluginInstallFunction = () => Promise<void>
export type Plugin = Partial<{ name: string; install: PluginInstallFunction }>

export async function runCommand(commands: Record<string, Plugin>) {
  const message = configuration.get(Messages.Name) || ""
  let choices = [] as Choice[]

  for (let key in commands) {
    const name = commands[key].name ?? key
    choices.push({
      name,
      value: key,
    })
  }

  const { feature } = await inquirer.prompt({
    type: "list",
    name: "feature",
    message,
    choices,
  })

  const fn = commands[feature]
  fn.install && fn.install()
}
