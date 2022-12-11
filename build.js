import { concurrently } from "concurrently";
import { mkdir, readdir, rename } from "fs/promises";

import PKG from "./package.json" assert { type: "json" };

console.log("Building...");

const { result } = concurrently(["pnpm:build:*"]);

result.then(async () => {
  console.log("Done building");
  try {
    await mkdir("./dist");
  } catch (_) {}
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
});
