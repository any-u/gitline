import Configuration, { Choice } from "@/config"

export const enum Messages {
  NAME = "name",
  TYPE = "type",
  DESC = "desc",
  BRANCH_RULE = "branch",
  BRANCH_DATE = "date",
  MAIN_BRANCH = "main_branch",
  NO_NAME = "no_name",
  TYPES = "types",
}

interface Config {
  [Messages.NAME]: string
  [Messages.TYPE]: string
  [Messages.DESC]: string
  [Messages.BRANCH_RULE]: string
  [Messages.BRANCH_DATE]: string
  [Messages.MAIN_BRANCH]: string
  [Messages.NO_NAME]: string
  [Messages.TYPES]: Choice[]
}

const defaults: Config = {
  [Messages.NAME]: "Create Branch",
  [Messages.TYPE]: `Select the type of branch of you're creating`,
  [Messages.DESC]: "Write a short description of  the branch",
  [Messages.BRANCH_RULE]: "<type>/<date>_<name>",
  [Messages.BRANCH_DATE]: "YYYYMMDDHHmm",
  [Messages.MAIN_BRANCH]: "main",
  [Messages.NO_NAME]: "Branch name is required",
  [Messages.TYPES]: [
    { name: "feat:     A new feature", value: "feat" },
    { name: "fix:      A bug fix", value: "fix" },
    { name: "docs:     Documentation only changes", value: "docs" },
    {
      name: "style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
      value: "style",
    },
    {
      name: "refactor: A code change that neither fixes a bug nor adds a feature",
      value: "refactor",
    },
    {
      name: "perf:     A code change that improves performance",
      value: "perf",
    },
    {
      name: "test:     Adding missing tests or correcting existing tests",
      value: "test",
    },
    {
      name: "build:    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) ",
      value: "build",
    },
    {
      name: "ci:       Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
      value: "ci",
    },
    {
      name: "chore:    Other changes that don't modify src or test files",
      value: "chore",
    },
    {
      name: "revert:   Reverts a previous commit",
      value: "revert",
    },
  ],
}

const config = new Configuration<Config>("create", defaults)
export default config
