import spawnAsync, {SpawnResult} from '@expo/spawn-async';

export class SH {
  readonly cwd: string;

  constructor(cwd?: string) {
    this.cwd = cwd || process.cwd();
  }

  runSh = async (command: string, cwd?: string): Promise<SpawnResult> => {
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

  static error = (exception: SpawnResult): Error =>
    new Error(
      'An error occurred:\n' +
        `Error: ${exception.stderr}\n` +
        `Output: ${exception.stdout}\n`
    );
}
