import {spawn} from 'node:child_process';

const NPX_COMMAND = process.platform === 'win32' ? 'npx.cmd' : 'npx';

export const normalizePathSeparators = (filePath: string): string =>
  filePath.replaceAll('\\', '/');

export const shouldIncludeInCspell = (filePath: string): boolean => {
  const normalizedPath = normalizePathSeparators(filePath);

  if (normalizedPath.startsWith('test/restDocs/results/')) return false;
  if (normalizedPath.startsWith('test/restDocs/__snapshots__/')) return false;

  return !(
    normalizedPath.startsWith('test/restDocs/') &&
    normalizedPath.endsWith('.json')
  );
};

export const filterFilesForCspell = (lsIgnoreOutput: string): string[] =>
  lsIgnoreOutput
    .split(/\r?\n/u)
    .filter(filePath => filePath !== '')
    .filter(shouldIncludeInCspell);

const waitForSuccessfulExit = async (
  childProcess: ReturnType<typeof spawn>,
  commandDescription: string,
): Promise<void> =>
  await new Promise<void>((resolve, reject) => {
    childProcess.once('error', error => {
      reject(
        new Error(`${commandDescription} failed to start: ${error.message}`),
      );
    });

    childProcess.once('close', (code, signal) => {
      if (code === 0 && signal === null) {
        resolve();
        return;
      }

      reject(
        new Error(
          `${commandDescription} exited unsuccessfully (code: ${code}, signal: ${signal})`,
        ),
      );
    });
  });

const getLsIgnoreFiles = async (): Promise<string[]> => {
  const childProcess = spawn(NPX_COMMAND, ['-y', 'ls-ignore', '--paths'], {
    stdio: ['ignore', 'pipe', 'inherit'],
  });

  let stdout = '';
  childProcess.stdout.on('data', chunk => {
    stdout += chunk.toString();
  });

  await waitForSuccessfulExit(childProcess, 'ls-ignore');
  return filterFilesForCspell(stdout);
};

export const runCspell = async (): Promise<void> => {
  const files = await getLsIgnoreFiles();
  const childProcess = spawn(
    NPX_COMMAND,
    ['-y', 'cspell', '--file-list', 'stdin'],
    {
      stdio: ['pipe', 'inherit', 'inherit'],
    },
  );

  childProcess.stdin.end(files.map(filePath => `${filePath}\n`).join(''));

  await waitForSuccessfulExit(childProcess, 'cspell');
};
