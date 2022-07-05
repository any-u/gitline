import yaml from "yaml"
import path from "path"
import fs from "fs-extra"

const configFile = path.resolve(__dirname, "../.gitline.yaml")

export interface Choice {
  name: string
  value: string
}

export function useBoolInput(val: string) {
  return ["y", "ye", "yes"].includes(val.toLowerCase())
}

class Configuration<T extends Record<string, any>> {
  config: T
  constructor(public readonly alias: string, public readonly defaults: T) {
    if (!fs.existsSync(configFile)) {
      this.config = defaults || {}
    } else {
      const res = yaml.parse(fs.readFileSync(configFile, "utf8"))
      this.config = res[alias] || defaults || {}
    }
  }

  get<K extends keyof T>(key: K) {
    return this.config[key]
      ? this.config[key]
      : this.defaults[key]
      ? this.defaults[key]
      : null
  }
}

export default Configuration
