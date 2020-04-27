import {SH} from './sh';
import {Git} from './git';
import {Settings} from './index';
import {ensureDirectoryExists} from '../../src/utils';
import {join} from 'path';

export const tmpBranchNameFunc = (type: string): string => `${type}-tmp`;

export class Helpers {
  readonly sh: SH;
  readonly git: Git;
  readonly settings: Settings;

  constructor(sh: SH, git: Git, settings: Settings) {
    this.sh = sh;
    this.git = git;
    this.settings = settings;
  }

  copyTypesBranchFromGeneratorToDTFork = async (): Promise<void> => {
    const {user, thisRepo, typesBranchName, tempTypesDirName} = this.settings;

    const sha = await this.git.getLatestCommitHash({
      owner: user,
      repo: thisRepo,
      branch: typesBranchName,
    });

    await this.downloadTypesBranch(sha);
    await this.copyTypesBranchToDTFork(); // TODO: handle deleted files?
    await this.deleteFolder(`${tempTypesDirName}`); // remove temp folder after copying
  };

  runDTTests = async (): Promise<void> => {
    await this.git.commit({message: 'tmp', stageAllFirst: true}); // commit all modified/added files so that test runner can detect what changed
    await this.npm('install'); // install required packages to run tests (no `npm ci` because https://github.com/DefinitelyTyped/DefinitelyTyped/pull/30476#issuecomment-593053174)
    await this.npm('test'); // run DT test runner on changed types
    await this.git.reset({hard: false, to: 'HEAD^', quiet: true}); // undo last commit
  };

  npm = async (command: 'i' | 'install' | 'test'): Promise<void> => {
    const cmd = `npm ${command}`;
    await this.sh.trySh(cmd);
  };

  downloadTypesBranch = async (commitSHA: string): Promise<void> => {
    const {dtForkPath, tempTypesDirName} = this.settings;
    const url = await this.git.getArchiveLink(commitSHA);
    ensureDirectoryExists(join(dtForkPath, tempTypesDirName));
    const cmd = `curl ${url} | tar xvz --strip-components=1 -C ${tempTypesDirName}`;
    await this.sh.trySh(cmd);
  };

  copyTypesBranchToDTFork = async (): Promise<void> => {
    const {tempTypesDirName, typesDirName} = this.settings;
    const cmd = `rsync -a ${tempTypesDirName}/ ${typesDirName}/`;
    await this.sh.trySh(cmd);
  };

  deleteFolder = async (path: string): Promise<void> => {
    const cmd = `rm -rf ${path}`;
    await this.sh.trySh(cmd);
  };
}
