// check
if (Deno.args[0] === undefined) {
  console.log("Please provide a version number like 1.0.0");
  Deno.exit(1);
}

// variables
const dist = "./dist";
const sources = "./sources";
const version = Deno.args[0];

// clean dist
await Deno.remove(dist, { recursive: true }).catch((_) => {});
await Deno.mkdir(dist);

// build
const build = await Deno.run({
  cmd: [
    "deno",
    "compile",
    "--output",
    `${dist}/cli`,
    "--allow-read",
    "--allow-net",
    "--allow-write",
    `${sources}/cli.ts`,
  ],
});

await build.status();

// package json file
const packageJson = JSON.stringify(
  {
    "name": "create-super-app",
    "description": "Jumpstart your next project in seconds",
    "version": version,
    "bin": "./cli",
    "license": "MIT",
    "author": "Christophe Ribeiro <christophe@ribeiro.io>",
    "repository": {
      "url": "https://github.com/createsuper/create-super-app",
    },
    "bugs": {
      "url": "https://github.com/createsuper/create-super-app/issues",
    },
    "keywords": [
      "boilerplate",
      "starter kit",
      "react",
      "next",
      "next.js",
    ],
  },
  null,
  2,
);

await Deno.writeTextFile(`${dist}/package.json`, packageJson);

// others files
await Deno.copyFile("LICENSE.md", `${dist}/LICENSE.md`);
await Deno.copyFile("README.md", `${dist}/README.md`);

// format files
const fmt = await Deno.run({
  cmd: [
    "deno",
    "fmt",
    `${dist}/`,
  ],
});

await fmt.status();
