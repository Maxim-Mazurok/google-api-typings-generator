import {SH} from './sh';
import {Git, Settings as GitSettings} from './git';
import {Settings} from './index';
import {ensureDirectoryExists} from '../../src/utils';
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

  npmPublish = async (cwd: string): Promise<void> => {
    const cmd = 'npm publish';
    try {
      await this.sh.runSh(cmd, cwd);
    } catch (exception) {
      if (
        (exception as SpawnResult).stderr.includes(
          'You cannot publish over the previously published versions'
        )
      ) {
        console.warn(
          `Revision already published for ${basename(cwd)}, skipping...`
        );
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
