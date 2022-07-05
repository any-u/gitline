import { simpleGit, SimpleGit } from "simple-git"

const git: SimpleGit = simpleGit()

export async function checkIfAllCommit() {
  const ret = await git.status(["--short"])
  return ret ? !ret.files.length : true
}

export default git
