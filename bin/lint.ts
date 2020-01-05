import { readdirSync } from 'fs';
import { join } from 'path';

const MAX_PARALLEL = 20;

process.stdout.setMaxListeners(MAX_PARALLEL);
process.stderr.setMaxListeners(MAX_PARALLEL);

const path = process.argv[2];
const runAll = require('npm-run-all');

console.log(`Reading project directories in ${path}`);

const scripts = readdirSync(path, { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .map(dir => `dtslint ${join(path, dir.name)}`);

const options = {
  maxParallel: MAX_PARALLEL,
  parallel: true,
  stdout: process.stdout,
  stderr: process.stderr
};

runAll([scripts.shift()], options) // run first synchronously to install TypeScript
  .then(() => runAll(scripts, options))
  .catch(err => process.exit(err.code));
