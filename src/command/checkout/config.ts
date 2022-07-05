import Configuration from "@/config"

export const enum Messages {
  NAME = "name",
  BRANCH = "branch",
}

interface Config {
  [Messages.NAME]: string
  [Messages.BRANCH]: string
}

const defaults: Config = {
  [Messages.NAME]: "Checkout Branch",
  [Messages.BRANCH]: "Select the branch of you're checkouting",
}

const config = new Configuration<Config>("checkout", defaults)
export default config
