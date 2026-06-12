import {
  cpSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import {cpus} from 'node:os';
import {basename, join} from 'node:path';
import runAll from 'npm-run-all';
import {
  getDiagnosticsDirectory,
  setOutputGHActions,
  SkippedPackage,
  writeSkippedPackagesSummary,
} from '../src/utils.js';

const MAX_PARALLEL =
  Number(process.env.GAPI_MAX_PARALLEL) || Math.max(cpus().length - 1, 1);

process.stdout.setMaxListeners(MAX_PARALLEL);
process.stderr.setMaxListeners(1 + MAX_PARALLEL);

process.on('unhandledRejection', reason => {
  throw reason;
});

const path = process.argv[2];
const bestEffort = process.env.GAPI_BEST_EFFORT === 'true';
const diagnosticsDirectory = getDiagnosticsDirectory(
  process.env.GAPI_DIAGNOSTICS_DIR,
);

console.log(`Reading project directories in ${path}...`);

const dtslintCommand = {start: 'dtslint "', end: '"'};
const scripts = readdirSync(path, {withFileTypes: true})
  .filter(dir => dir.isDirectory())
  .map(
    dir =>
      `${dtslintCommand.start}${join(path, dir.name)}${dtslintCommand.end}`,
  );

const originalScriptCount = scripts.length;

const options = {
  maxParallel: MAX_PARALLEL,
  parallel: true,
  stdout: process.stdout,
  stderr: process.stderr,
};

console.log(
  `Linting ${scripts.length} projects in ${MAX_PARALLEL} parallel processes...`,
);

// remove `types/` from eslint config file, otherwise new eslint-based dtslint won't be able to lint the files
const eslintConfigPath = join(import.meta.dirname, '..', 'eslint.config.cjs');
const originalEslintConfig = readFileSync(eslintConfigPath, 'utf8');
const newEslintConfig = originalEslintConfig.replace("'types/',", '');
console.log(`Updating ${eslintConfigPath}...`);
writeFileSync(eslintConfigPath, newEslintConfig);

const failedPackages = new Map<string, SkippedPackage>();

function recordFailures(error: unknown) {
  if (
    error === null ||
    typeof error !== 'object' ||
    !('results' in error) ||
    !Array.isArray(error.results)
  ) {
    throw error;
  }

  const results = error.results as Array<{name: string; code: number}>;

  results
    .filter(result => result.code !== 0)
    .forEach(result => {
      const failedTypeMatches = result.name.match(
        new RegExp(`${dtslintCommand.start}(.*)${dtslintCommand.end}`),
      );

      if (failedTypeMatches === null) {
        console.error('Unable to match failedType', {failedTypeMatches});
        return;
      }

      const failedType = failedTypeMatches[1];
      const packageName = basename(failedType);

      failedPackages.set(packageName, {
        packageName,
        phase: 'lint',
        reason: `dtslint exited with code ${result.code}`,
      });

      const lintDiagnosticsDirectory = join(
        diagnosticsDirectory,
        'lint-failures',
        packageName,
      );

      mkdirSync(lintDiagnosticsDirectory, {recursive: true});
      cpSync(failedType, join(lintDiagnosticsDirectory, packageName), {
        recursive: true,
      });
      writeFileSync(
        join(lintDiagnosticsDirectory, 'error.txt'),
        `dtslint exited with code ${result.code}`,
      );
      console.error(
        `Wrote lint failure diagnostics to ${lintDiagnosticsDirectory}`,
      );
    });
}

async function runLint() {
  const firstScript = scripts.shift();

  if (firstScript !== undefined) {
    try {
      // Run first synchronously to install TypeScript before parallel linting.
      await runAll([firstScript], options);
    } catch (error) {
      recordFailures(error);
    }
  }

  try {
    await runAll(scripts, options);
  } catch (error) {
    recordFailures(error);
  }

  const failures = [...failedPackages.values()];

  if (failures.length > 0) {
    const failedNames = failures.map(failure => failure.packageName);
    setOutputGHActions('FAILED_TYPE', failedNames[0]);
    setOutputGHActions('FAILED_TYPES', failedNames.join(','));
    writeSkippedPackagesSummary(failures);

    if (failures.length === originalScriptCount) {
      throw Error(`Failed to lint all ${failures.length} package(s)`);
    }

    if (!bestEffort) {
      throw Error(`Failed to lint ${failures.length} package(s)`);
    }
  }
}

void runLint().finally(() => {
  console.log(`Restoring ${eslintConfigPath}...`);
  writeFileSync(eslintConfigPath, originalEslintConfig);
});
