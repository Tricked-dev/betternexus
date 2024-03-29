import { execSync } from "child_process"
import { renameSync } from "fs"
import { mkdir, readFile, readdir, rename } from "fs/promises"

console.log("Reading package.json...")
const { name, version } = JSON.parse(await readFile("./package.json", "utf-8"))

console.log("Building...")
// run all build script for browsers
execSync("pnpm build", {
  stdio: "inherit"
})

console.log("Done building")
// create dist folder if it doesn't exist already
await mkdir("./dist").catch(() => {})

await mkdir("./build/x/").catch(() => {})

renameSync("build/chrome-mv3-prod", `build/x/${name}-${version}`)

// rename all zip files to include version number and browser name
for await (let file of await readdir("./build")) {
  if (!file.endsWith(".zip")) continue
  let browser = file.split("-")[0]
  await rename(
    `./build/${file}`,
    `./dist/${name}-${version}-${browser}.zip`
  ).catch(console.error)
}
