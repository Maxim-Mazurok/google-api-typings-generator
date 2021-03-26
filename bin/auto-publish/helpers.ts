import {SH} from './sh';
import {Git, Settings as GitSettings} from './git';
import {Settings} from './index';
import {ensureDirectoryExists, sleep} from '../../src/utils';
import {Octokit} from '@octokit/rest';
import {readdirSync} from 'fs';
import {SpawnResult} from '@expo/spawn-async';
import {basename} from 'path';

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
    retries = 3,
    retryTimeout = 3000 // ms
  ): Promise<void> => {
    retries--;
    const cmd = 'npm publish --access public';
    const apiName = basename(cwd);
    try {
      await this.sh.runSh(cmd, cwd);
    } catch (exception) {
      const error = (exception as SpawnResult).stderr;
      if (
        error.includes(
          'You cannot publish over the previously published versions'
        )
      ) {
        console.warn(`Revision already published for ${apiName}, skipping...`);
      } else if (
        (error.includes('503 Service Unavailable') ||
          error.includes('404 Not Found')) &&
        retries > 0
      ) {
        const errorCode = error.includes('503 Service Unavailable')
          ? '503'
          : error.includes('404 Not Found')
          ? '404'
          : 'UNKNOWN';
        console.warn(
          `NPM returned ${errorCode} for ${apiName}, retrying in ${retryTimeout}ms...`
        );
        await sleep(retryTimeout);
        this.npmPublish(cwd, retries);
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
