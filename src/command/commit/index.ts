import inquirer from "inquirer"
import config, { Messages } from "./config"
import picocolors from "picocolors"
import git, { checkIfAllCommit } from "@/runner"
import { useBoolInput } from "@/config"

const { green, yellow, cyan, gray } = picocolors
interface Answer {
  type: string
  scope: string
  subject: string
  body: string
  breaking: "No" | "Yes"
  breakingDesc: string
  breakingBody: string
  footer: "No" | "Yes"
  footerDesc: string
  footerBody: string
}

export default {
  name: config.get(Messages.NAME),
  async install() {
    const commit = await checkIfAllCommit()
    if (commit) {
      console.log(yellow(`[Gitline] nothing to commit, working tree clean`))
      return
    }
    const {
      type,
      scope,
      subject,
      body,
      breaking,
      breakingBody,
      breakingDesc,
      footer,
      footerDesc,
      footerBody,
    } = await inquirer.prompt<Answer>([
      {
        type: "list",
        name: "type",
        message: config.get(Messages.TYPE),
        choices: config.get(Messages.TYPES),
      },
      {
        type: "input",
        name: "scope",
        message: config.get(Messages.SCOPE),
      },
      {
        type: "input",
        name: "subject",
        message: config.get(Messages.SUBJECT),
        validate(input) {
          if (!input.length) return config.get(Messages.NO_SUBJECT)
          return true
        },
        transformer(input: string) {
          return `\n${green(`(${input.length}) ${input}`)}`
        },
      },
      {
        type: "input",
        name: "body",
        message: config.get(Messages.BODY),
        transformer(input: string) {
          if (!input) return input

          return `\n${green(input)}`
        },
      },
      {
        type: "input",
        name: "breaking",
        message: config.get(Messages.BREAKING),
        default: gray("y/N"),
        transformer(input: string) {
          return useBoolInput(input) ? cyan("Yes") : cyan("No")
        },
      },
      {
        type: "input",
        name: "breakingBody",
        message: config.get(Messages.BREAKING_BODY),
        validate(input) {
          if (!input.length) return config.get(Messages.NO_BREAKING)
          return true
        },
        transformer(input: string) {
          if (!input) return input
          return `\n${green(input)}`
        },
        when: function (answers) {
          return useBoolInput(answers.breaking) && !answers.body
        },
      },
      {
        type: "input",
        name: "breakingDesc",
        message: config.get(Messages.BREAKING_DESC),
        transformer(input: string) {
          if (!input) return input
          return `\n${green(input)}`
        },
        when: function (answers) {
          return useBoolInput(answers.breaking)
        },
      },
      {
        type: "input",
        name: "footer",
        message: config.get(Messages.FOOTER),
        default: gray("y/N"),
        transformer(input: string) {
          return useBoolInput(input) ? cyan("Yes") : cyan("No")
        },
      },
      {
        type: "input",
        name: "footerBody",
        message: config.get(Messages.FOOTER_BODY),
        validate(input) {
          if (!input.length) return config.get(Messages.NO_FOOTER)
          return true
        },
        transformer(input: string) {
          if (!input) return input
          return `\n${green(input)}`
        },
        when: function (answers) {
          return useBoolInput(answers.footer) && !answers.body
        },
      },
      {
        type: "input",
        name: "footerDesc",
        message: config.get(Messages.FOOTER_DESC),
        transformer(input: string) {
          if (!input) return input
          return `\n${green(input)}`
        },
        when: function (answers) {
          return useBoolInput(answers.footer)
        },
      },
    ])

    let message = scope
      ? `${type}(${scope}): ${subject}`
      : `${type}: ${subject}`

    const realBody = body
      ? body
      : breakingBody
      ? breakingBody
      : footerBody
      ? footerBody
      : null
    if (realBody) {
      message += `\n\n${realBody}`
      if (useBoolInput(breaking)) {
        message += `\n\nBREAKING CHANGE: ${breakingDesc}`
      }

      if (useBoolInput(footer)) {
        message += `\n\n${footerDesc}`
      }
    }

    await git.add("./*")
    await git.commit(message)
  },
}
