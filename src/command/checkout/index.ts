import git from "@/runner"
import fuzzy from "fuzzy"
import inquirer from "inquirer"
import inquirerPrompt from "inquirer-autocomplete-prompt"
import cache from "./cache"
import config, { Messages } from "./config"

/* register autocomplete type prompt */
inquirer.registerPrompt("autocomplete", inquirerPrompt)

export default {
  name: config.get(Messages.NAME),
  async install() {
    const last = await git.branchLocal()
    const branchList = last.all.slice(1)

    async function searchBranch(answers: any, input = cache.get()) {
      return fuzzy.filter(input, branchList).map((el) => el.original)
    }

    const res = await inquirer.prompt({
      name: "branch",
      // @ts-ignore
      type: "autocomplete",
      message: config.get(Messages.BRANCH) || "",
      source: searchBranch,
    })

    cache.set(res.branch)
    
    await git.checkout(res.branch)
  },
}
