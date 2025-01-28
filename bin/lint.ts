import {readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {basename, join} from 'node:path';
import runAll from 'npm-run-all';
import {setOutputGHActions} from '../src/utils.js';

const MAX_PARALLEL =
  Number(process.env.GAPI_MAX_PARALLEL) || Math.max(cpus().length - 1, 1);

process.stdout.setMaxListeners(MAX_PARALLEL);
process.stderr.setMaxListeners(1 + MAX_PARALLEL);

process.on('unhandledRejection', reason => {
  throw reason;
});

const path = process.argv[2];

console.log(`Reading project directories in ${path}...`);

const dtslintCommand = {start: 'dtslint "', end: '"'};
const scripts = readdirSync(path, {withFileTypes: true})
  .filter(dir => dir.isDirectory())
  .map(
    dir =>
      `${dtslintCommand.start}${join(path, dir.name)}${dtslintCommand.end}`,
  );

const options = {
  maxParallel: MAX_PARALLEL,
  parallel: true,
  stdout: process.stdout,
  stderr: process.stderr,
};

console.log(
  `Linting ${scripts.length} projects in ${MAX_PARALLEL} parallel processes...`,
);

// remove `types/` from .eslintignore file, otherwise new eslint-based dtslint won't be able to lint the files
const eslintIgnorePath = join(__dirname, '..', '.eslintignore');
const originalEslintIgnore = readFileSync(eslintIgnorePath, 'utf8');
const newEslintIgnore = originalEslintIgnore.replace('types/', '');
console.log(`Updating ${eslintIgnorePath}...`);
writeFileSync(eslintIgnorePath, newEslintIgnore);

runAll([scripts.shift()], options) // run first synchronously to install TypeScript
  .then(() => runAll(scripts, options))
  .catch(error => {
    if (error.results) {
      const results: Array<{name: string; code: number}> = error.results;
      const failedTypeCommand = results.find(result => result.code === 1);

      if (failedTypeCommand !== undefined) {
        const failedTypeMatches = failedTypeCommand.name.match(
          new RegExp(`${dtslintCommand.start}(.*)${dtslintCommand.end}`),
        );

        if (failedTypeMatches !== null) {
          const failedType = failedTypeMatches[1];
          setOutputGHActions('FAILED_TYPE', basename(failedType));
        } else {
          console.error('Unable to match failedType', {failedTypeMatches});
        }
      } else {
        console.error('Unable to find failedTypeCommand', {results});
      }
    }

    throw error;
  })
  .finally(() => {
    console.log(`Restoring ${eslintIgnorePath}...`);
    writeFileSync(eslintIgnorePath, originalEslintIgnore);
  });
