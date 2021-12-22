import { build } from "https://deno.land/x/dnt/mod.ts";

// clean npm folder
await Deno.remove("npm", { recursive: true }).catch((_) => {});

// build npm folder
await build({
  entryPoints: [{
    kind: "bin",
    name: "create-super-app",
    path: "./sources/cli.ts",
  }],
  outDir: "./npm",
  package: {
    name: "create-super-app",
    description: "Jumpstart your next super project in seconds",
    version: Deno.args[0],
    license: "MIT",
    author: "Christophe Ribeiro <christophe@ribeiro.io>",
    repository: {
      url: "https://github.com/createsuper/create-super-app",
    },
    bugs: {
      url: "https://github.com/createsuper/create-super-app/issues",
    },
    keywords: [
      "boilerplate",
      "starter kit",
      "react",
      "next",
      "next.js",
    ],
  },
});

// post build steps
Deno.copyFileSync("LICENSE.md", "npm/LICENSE.md");
Deno.copyFileSync("README.md", "npm/README.md");
