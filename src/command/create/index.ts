import inquirer from "inquirer"
import dayjs from "dayjs"
import git from "@/runner"
import config, { Messages } from "./config"

type Branch = {
  type: string
  name: string
}

function toName({ type, name }: Branch) {
  let res: string = config.get(Messages.BRANCH_RULE) || "<type>/<date>_<name>"

  res = res.replace("<type>", type).replace("<name>", name)
  if (res.includes("<date>")) {
    const format = config.get(Messages.BRANCH_DATE) || "YYYYMMDDHHmm"
    const date = dayjs().format(format)
    res = res.replace("<date>", date)
  }
  return res
}

export default {
  name: config.get(Messages.NAME),
  async install() {
    const answer = await inquirer.prompt<Branch>([
      {
        type: "list",
        name: "type",
        message: config.get(Messages.TYPE),
        choices: config.get(Messages.TYPES),
      },
      {
        type: "input",
        name: "name",
        message: config.get(Messages.DESC),
        validate(input) {
          if (!input.length) return config.get(Messages.NO_NAME)
          return true
        },
      },
    ])

    await git.checkoutBranch(toName(answer), config.get(Messages.MAIN_BRANCH) || "")
  },
}
