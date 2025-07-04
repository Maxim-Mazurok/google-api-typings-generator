import {Octokit} from '@octokit/rest';
import {readdirSync} from 'node:fs';
import {basename} from 'node:path';
import {
  ensureDirectoryExists,
  getRevision,
  hasOwnProperty,
  rootFolder,
  sleep,
} from '../../src/utils.js';
import {GitHub, GitHubSettings} from './git-hub.js';
import {Settings} from './index.js';
import {SH} from './sh.js';

export const createOctokit = ({
  auth,
  user,
  thisRepo,
}: GitHubSettings): Octokit =>
  new Octokit({
    auth,
    userAgent: `${user}/${thisRepo}`,
    timeZone: 'UTC',
  });

export class Helpers {
  readonly sh: SH;
  readonly gitHub: GitHub;
  readonly settings: Settings;

  constructor(sh: SH, gitHub: GitHub, settings: Settings) {
    this.sh = sh;
    this.gitHub = gitHub;
    this.settings = settings;
  }

  npmPublish = async (
    cwd: string,
    retriesLeft = 5,
    retryTimeout = 60, // seconds
  ): Promise<void> => {
    retriesLeft--;
    const cmd = 'npm publish --access public';
    const apiName = basename(cwd);
    const error503 = '503 Service Unavailable';
    const error404 = '404 Not Found';
    const error429 = '429 Too Many Requests';
    try {
      await this.sh.runSh(cmd, cwd);
    } catch (exception) {
      if (exception instanceof Error === false) {
        console.error('Unknown exception type: ', {exception});
        throw exception;
      }
      if (
        !hasOwnProperty(exception, 'stderr') ||
        typeof exception.stderr !== 'string'
      ) {
        console.error('Non-SpawnResult exception type: ', {exception});
        throw exception;
      }
      const error = exception.stderr;
      if (
        error.includes(
          'You cannot publish over the previously published versions',
        )
      ) {
        console.warn(`Revision already published for ${apiName}, skipping...`);
      } else if (
        (error.includes(error503) ||
          error.includes(error404) ||
          error.includes(error429)) &&
        retriesLeft > 0
      ) {
        console.warn(
          `NPM returned ${error} for ${apiName}, retrying in ${retryTimeout}s...`,
        );
        sleep(retryTimeout);
        await this.npmPublish(cwd, retriesLeft);
      } else {
        throw SH.error(exception);
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

    const commitSHA = await this.gitHub.getLatestCommitHash({
      owner: user,
      repo: thisRepo,
      branch: typesBranchName,
    });

    const url = await this.gitHub.getArchiveLink(commitSHA);
    ensureDirectoryExists(typesDirName);
    const cmd = `curl ${url} | tar xvz --strip-components=1 -C ${typesDirName}`;
    await this.sh.trySh(cmd);
  };

  getAllTypes = (): {name: string; revision: number}[] => {
    const {typesDirName: tempTypesDirName} = this.settings;

    const getDirectories = (source: URL) =>
      readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => {
          const name = dirent.name;
          const indexDTSPath = new URL(`${name}/index.d.ts`, source);
          const revision = getRevision(indexDTSPath);
          if (revision === undefined) {
            throw new Error(`Could not get revision from ${indexDTSPath}`);
          }
          return {
            name,
            revision,
          };
        });

    return getDirectories(new URL(`${tempTypesDirName}/`, rootFolder));
  };
}
