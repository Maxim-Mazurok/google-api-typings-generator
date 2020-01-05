import { readdirSync } from 'fs';
import { join } from 'path';

const path = process.argv[2];
const runAll = require('npm-run-all');

console.log(`Reading project directories in ${path}`);

const scripts = readdirSync(path, { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .map(dir => `dtslint ${join(path, dir.name)}`);

const options = {
  maxParallel: scripts.length,
  parallel: true,
  stdout: process.stdout,
  stderr: process.stderr
};

process.stdout.setMaxListeners(scripts.length);
process.stderr.setMaxListeners(scripts.length);

runAll([scripts.shift()], options) // run first synchronously to install TypeScript
  .then(() => runAll(scripts, options))
  .catch(err => process.exit(err.code));
