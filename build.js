import { concurrently } from "concurrently";
import { mkdir, readdir, rename } from "fs/promises";

import PKG from "./package.json" assert { type: "json" };

console.log("Building...");

// run all build script for browsers
const { result } = concurrently(["pnpm:build:*"]);
await result;

console.log("Done building");
// create dist folder if it doesn't exist already
try {
  await mkdir("./dist");
} catch (_) {}
// rename all zip files to include version number and browser name
for await (let file of await readdir("./build")) {
  if (!file.endsWith(".zip")) continue;
  try {
    await rename(
      "./build/" + file,
      `./dist/${PKG.name}-${PKG.version}-${file.split("-")[0]}.zip`,
    );
  } catch (error) {
    console.error(error);
  }
}
