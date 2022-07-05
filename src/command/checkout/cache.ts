import yaml from "yaml"
import picocolors from "picocolors"
import path from "path"
import fs from "fs-extra"

const { red } = picocolors

const cacheFile = path.resolve(__dirname, "../../../.cache.yaml")

interface Config {
  last: string
}
let config = {} as Config

try {
  if (!fs.existsSync(cacheFile)) {
    fs.writeFileSync(cacheFile, yaml.stringify(config))
  } else {
    const cache = fs.readFileSync(cacheFile).toString()
    config = yaml.parse(cache) || {}
  }
} catch (error: any) {
  console.error(red(`${error.message}`))
}

function get() {
  return config.last || ""
}

function set(branch: string) {
  config.last = branch

  try {
    fs.writeFileSync(cacheFile, yaml.stringify(config))
  } catch (error: any) {
    console.log(red(`no access! ${error.message}`))
  }
}

export default {
  get,
  set,
}
