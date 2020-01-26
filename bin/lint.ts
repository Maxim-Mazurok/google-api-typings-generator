import { readdirSync } from 'fs';
import { join } from 'path';
// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
import * as runAll from 'npm-run-all';
import ErrnoException = NodeJS.ErrnoException;

const MAX_PARALLEL = Number(process.env.GAPI_MAX_PARALLEL) || 1;

process.stdout.setMaxListeners(MAX_PARALLEL);
process.stderr.setMaxListeners(1 + MAX_PARALLEL);

const path = process.argv[2];

console.log(`Reading project directories in ${path}...`);

const scripts = readdirSync(path, { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .map(dir => `dtslint ${join(path, dir.name)}`);

const options = {
  maxParallel: MAX_PARALLEL,
  parallel: true,
  stdout: process.stdout,
  stderr: process.stderr
};

console.log(`Linting ${scripts.length} projects in ${MAX_PARALLEL} parallel processes...`);

runAll([scripts.shift()], options) // run first synchronously to install TypeScript
  .then(() => runAll(scripts, options))
  .catch((err: ErrnoException) => process.exit(err.errno));
