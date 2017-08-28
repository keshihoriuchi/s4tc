#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const program = require("commander");

program
  .version("0.0.2")
  .option("-c, --cert <path>", "(required) cert file path")
  .option("-k, --key <path>", "(required) key file path")
  .option(
    "-p, --port <number>",
    "(optional) listening port number. default 443",
    parseInt
  )
  .parse(process.argv);

if (!program.cert) {
  console.error("require arg '-c, --cert <path>'");
  process.exit(1);
}
if (!program.key) {
  console.error("require arg '-k, --key <path>'");
  process.exit(1);
}

const port = program.port || 443;

Promise.all([
  new Promise((res, rej) =>
    fs.readFile(program.cert, (e, d) => (e ? rej(e) : res(d)))
  ),
  new Promise((res, rej) =>
    fs.readFile(program.key, (e, d) => (e ? rej(e) : res(d)))
  )
])
  .then(results => {
    https
      .createServer({ cert: results[0], key: results[1] }, (req, res) => {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Hello, world\n");
      })
      .listen(port);
  })
  .catch(console.error);
