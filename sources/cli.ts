#!/usr/bin/env node

import yargs from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

// cli
// yarn create @super/app my-name --template=app
// yarn create @super/saas my-name (shortcut)

// options:
// --js/--ts to specify the language. Default is ts.
// --t/--template to specify the template name. Default is `app` with `ts`: template-super-app/typescript

interface Arguments {
  typescript: string;
  javascript: string;
  template: string;
}

let inputArgs: Arguments = yargs(Deno.args)
  .option("typescript", {
    alias: "ts",
    type: "boolean",
    description: "TypeScript version",
    default: true,
  })
  .option("javascript", {
    alias: "js",
    type: "boolean",
    description: "JavaScript version",
    default: false,
  })
  .option("starter", {
    alias: "st",
    type: "string",
    description: "Starter kit name",
    choices: ["app"],
    default: "app",
  })
  .check((argv: Arguments) => {
    if (argv.typescript && argv.javascript) {
      throw new Error("You must choose between JavaScript and TypeScript.");
    }

    return true;
  })
  .help("help")
  .argv;

console.log(inputArgs);

// let errorMessages: { [k: string]: string } = {
//   typescript: "Provide the message sender (From:) value using --from [-f] parameter",
//   javascript: "Provide the message receiver (To:) value using --to [-t] parameter",
// };

// inputArgs = _.defaults(inputArgs, {
//   typescript: true,
//   javascript: false,
// });
// inputArgs = <any> _.pickBy(inputArgs, _.identity);

// let errors: string[] = _.difference(_.keys(errorMessages), _.keys(inputArgs));
// if (errors.length > 0) {
//   errors.forEach((error) => console.log(errorMessages[error]));
//   console.log(
//     "Proper program usage is: deno run --allow-net sources/main.ts --ts",
//   );
//   Deno.exit(1);
// }
