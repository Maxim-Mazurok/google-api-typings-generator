import spawnAsync, {SpawnResult} from '@expo/spawn-async';
import {hasOwnProperty} from '../../src/utils.js';

export class SH {
  readonly cwd: string;

  constructor(cwd?: string) {
    this.cwd = cwd || process.cwd();
  }

  runSh = (command: string, cwd?: string): Promise<SpawnResult> => {
    console.log(command);
    return spawnAsync(command, undefined, {
      shell: true,
      cwd: cwd || this.cwd,
    });
  };

  trySh = async (command: string, cwd?: string): Promise<SpawnResult> => {
    try {
      const result = await this.runSh(command, cwd);
      process.env.DEBUG && console.log(result);
      return result;
    } catch (exception) {
      console.log(exception);
      throw SH.error(exception);
    }
  };

  static error = (exception: unknown): Error => {
    if (exception instanceof Error) {
      if (
        hasOwnProperty(exception, 'stderr') &&
        typeof exception.stderr === 'string' &&
        hasOwnProperty(exception, 'stdout') &&
        typeof exception.stdout === 'string'
      ) {
        return new Error(
          'An error occurred:\n' +
            `Error: ${exception.stderr}\n` +
            `Output: ${exception.stdout}\n`
        );
      }
      return exception;
    }
    console.error('Unknown exception type: ', {exception});
    throw exception;
  };
}
