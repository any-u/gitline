import Configuration, { Choice } from "@/config"

export const enum Messages {
  NAME = "name",
  TYPE = "type",
  SCOPE = "scope",
  SUBJECT = "subject",
  BODY = "body",
  BREAKING = "breaking",
  BREAKING_DESC = "breaking_desc",
  BREAKING_BODY = "breaking_body",
  FOOTER = "footer",
  FOOTER_DESC = "footer_desc",
  FOOTER_BODY = "footer_body",

  NO_SUBJECT = "no_subject",
  NO_BREAKING = "no_breaking",
  NO_FOOTER = "no_footer",

  TYPES = "types",
}

interface Config {
  [Messages.NAME]: string
  [Messages.TYPE]: string
  [Messages.SCOPE]: string
  [Messages.SUBJECT]: string
  [Messages.BODY]: string
  [Messages.BREAKING]: string
  [Messages.BREAKING_DESC]: string
  [Messages.BREAKING_BODY]: string
  [Messages.FOOTER]: string
  [Messages.FOOTER_DESC]: string
  [Messages.FOOTER_BODY]: string
  [Messages.NO_SUBJECT]: string
  [Messages.NO_BREAKING]: string
  [Messages.NO_FOOTER]: string
  [Messages.TYPES]: Choice[]
}

const defaults: Config = {
  [Messages.NAME]: "Commit",
  [Messages.TYPE]: `Select the type of change that you're committing`,
  [Messages.SCOPE]:
    "What is the scope of this change (e.g. component or file name): (press enter to skip)",
  [Messages.SUBJECT]:
    "Write a short, imperative tense description of the change (max 94 chars):",
  [Messages.BODY]:
    "Provide a longer description of the change: (press enter to skip)",
  [Messages.BREAKING]: "Are there any breaking changes?",
  [Messages.BREAKING_DESC]: "Describe the breaking changes",
  [Messages.BREAKING_BODY]:
    "A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself:",
  [Messages.FOOTER]: "Does this change affect any open issues",
  [Messages.FOOTER_DESC]: 'Add issue references (e.g. "fix #123", "re #123".)',
  [Messages.FOOTER_BODY]:
    "If issues are closed, the commit requires a body. Please enter a longer description of the commit itself:",
  [Messages.NO_SUBJECT]: "Subject is required",
  [Messages.NO_BREAKING]: "Body is required for BREAKING CHANGE",
  [Messages.NO_FOOTER]: "Body is required for Footer",
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

const config = new Configuration<Config>("commit", defaults)
export default config
