import {spawn} from 'node:child_process';
import type {StdioOptions} from 'node:child_process';

type SpawnCommand = {
  command: string;
  args: string[];
};

export const normalizePathSeparators = (filePath: string): string =>
  filePath.replaceAll('\\', '/');

export const parseGitFileList = (gitLsFilesOutput: string): string[] =>
  gitLsFilesOutput.split('\0').filter(filePath => filePath !== '');

export const getNpxSpawnCommand = (
  args: string[],
  platform = process.platform,
): SpawnCommand =>
  platform === 'win32'
    ? {
        command: 'cmd.exe',
        args: ['/d', '/s', '/c', 'npx', ...args],
      }
    : {
        command: 'npx',
        args,
      };

export const shouldIncludeInCspell = (filePath: string): boolean => {
  const normalizedPath = normalizePathSeparators(filePath);

  if (normalizedPath.startsWith('test/restDocs/results/')) return false;
  if (normalizedPath.startsWith('test/restDocs/__snapshots__/')) return false;

  return !(
    normalizedPath.startsWith('test/restDocs/') &&
    normalizedPath.endsWith('.json')
  );
};

export const filterFilesForCspell = (filePaths: string[]): string[] =>
  filePaths.filter(shouldIncludeInCspell);

const spawnNpx = (
  args: string[],
  stdio: StdioOptions,
): ReturnType<typeof spawn> => {
  const spawnCommand = getNpxSpawnCommand(args);
  return spawn(spawnCommand.command, spawnCommand.args, {stdio});
};

const spawnGit = (
  args: string[],
  stdio: StdioOptions,
): ReturnType<typeof spawn> => spawn('git', args, {stdio});

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

const getGitFiles = async (): Promise<string[]> => {
  const childProcess = spawnGit(
    ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
    ['ignore', 'pipe', 'inherit'],
  );
  const stdoutStream = childProcess.stdout;

  if (stdoutStream === null) {
    throw new Error('git ls-files stdout is not available');
  }

  let stdout = '';
  stdoutStream.on('data', chunk => {
    stdout += chunk.toString();
  });

  await waitForSuccessfulExit(childProcess, 'git ls-files');
  return parseGitFileList(stdout);
};

export const runCspell = async (): Promise<void> => {
  const files = filterFilesForCspell(await getGitFiles());
  const childProcess = spawnNpx(
    ['-y', 'cspell', '--file-list', 'stdin'],
    ['pipe', 'inherit', 'inherit'],
  );
  const stdinStream = childProcess.stdin;

  if (stdinStream === null) {
    throw new Error('cspell stdin is not available');
  }

  stdinStream.end(files.map(filePath => `${filePath}\n`).join(''));

  await waitForSuccessfulExit(childProcess, 'cspell');
};
