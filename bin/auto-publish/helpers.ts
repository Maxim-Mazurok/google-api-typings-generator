import {SH} from './sh.js';
import {Git, Settings as GitSettings} from './git.js';
import {Settings} from './index.js';
import {ensureDirectoryExists, hasOwnProperty, sleep} from '../../src/utils.js';
import {Octokit} from '@octokit/rest';
import {readdirSync} from 'node:fs';
import {basename} from 'node:path';

export const createOctokit = ({auth, user, thisRepo}: GitSettings) =>
  new Octokit({
    auth,
    userAgent: `${user}/${thisRepo}`,
    timeZone: 'UTC',
  });

export class Helpers {
  readonly sh: SH;
  readonly git: Git;
  readonly settings: Settings;

  constructor(sh: SH, git: Git, settings: Settings) {
    this.sh = sh;
    this.git = git;
    this.settings = settings;
  }

  npmPublish = async (
    cwd: string,
    retries = 5,
    retryTimeout = 5 // seconds
  ): Promise<void> => {
    retries--;
    const cmd = 'npm publish --access public';
    const apiName = basename(cwd);
    const error503 = '503 Service Unavailable';
    const error404 = '404 Not Found';
    try {
      await this.sh.runSh(cmd, cwd);
    } catch (exception) {
      if (exception instanceof Error) {
        if (
          hasOwnProperty(exception, 'stderr') &&
          typeof exception.stderr === 'string'
        ) {
          const error = exception.stderr;
          if (
            error.includes(
              'You cannot publish over the previously published versions'
            )
          ) {
            console.warn(
              `Revision already published for ${apiName}, skipping...`
            );
          } else if (
            (error.includes(error503) || error.includes(error404)) &&
            retries > 0
          ) {
            const errorCodeAndMessage = error.includes(error503)
              ? error503
              : error.includes(error404)
              ? error404
              : error;
            console.warn(
              `NPM returned ${errorCodeAndMessage} for ${apiName}, retrying in ${retryTimeout}ms...`
            );
            sleep(retryTimeout);
            await this.npmPublish(cwd, retries);
          } else {
            throw SH.error(exception);
          }
        } else {
          console.error('Non-SpawnResult exception type: ', {exception});
          throw exception;
        }
      } else {
        console.error('Unknown exception type: ', {exception});
        throw exception;
      }
    }
  };

  downloadTypesBranch = async (): Promise<void> => {
    const {
      user,
      thisRepo,
      typesBranchName,
      typesDirName: typesDirName,
    } = this.settings;

    const commitSHA = await this.git.getLatestCommitHash({
      owner: user,
      repo: thisRepo,
      branch: typesBranchName,
    });

    const url = await this.git.getArchiveLink(commitSHA);
    ensureDirectoryExists(typesDirName);
    const cmd = `curl ${url} | tar xvz --strip-components=1 -C ${typesDirName}`;
    await this.sh.trySh(cmd);
  };

  getAllTypes = (): string[] => {
    const {typesDirName: tempTypesDirName} = this.settings;

    const getDirectories = (source: string) =>
      readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    return getDirectories(tempTypesDirName);
  };
}
