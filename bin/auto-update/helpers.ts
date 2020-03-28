import { SH } from './sh';
import { Git } from './git';
import { Settings } from './index';

export class Helpers {
  readonly #sh: SH;
  readonly #git: Git;
  readonly #settings: Settings;

  constructor(sh: SH, git: Git, settings: Settings) {
    this.#sh = sh;
    this.#git = git;
    this.#settings = settings;
  }

  copyTypesBranchFromGeneratorToDTFork = async (): Promise<void> => {
    const { thisRepo, typesBranchName } = this.#settings;
    await this.downloadTypesBranch();
    await this.copyTypesBranchToDTFork(); // TODO: handle deleted files?
    await this.deleteFolder(`${thisRepo}-${typesBranchName}`); // remove original folder after copying
    await this.#git.commit({ message: 'tmp', all: true }); // commit all modified/added files so that test runner can detect what changed
    await this.npm('install'); // install required packages to run tests (no `npm ci` because https://github.com/DefinitelyTyped/DefinitelyTyped/pull/30476#issuecomment-593053174)
    await this.npm('test'); // run DT test runner on changed types
    await this.#git.reset({ hard: false, to: 'HEAD^', quiet: true }); // undo last commit
  };

  npm = async (command: 'i' | 'install' | 'test'): Promise<void> => {
    const cmd = `npm ${command}`;
    await this.#sh.trySh(cmd);
  };

  downloadTypesBranch = async (): Promise<void> => {
    const { user, thisRepo, typesBranchName } = this.#settings;
    const cmd = `curl https://codeload.github.com/${user}/${thisRepo}/tar.gz/${typesBranchName} | tar xvz -`;
    await this.#sh.trySh(cmd);
  };

  copyTypesBranchToDTFork = async (): Promise<void> => {
    const { thisRepo, typesBranchName, typesDirName } = this.#settings;
    const cmd = `rsync -a ${thisRepo}-${typesBranchName}/ ${typesDirName}/`;
    await this.#sh.trySh(cmd);
  };

  deleteFolder = async (path: string): Promise<void> => {
    const cmd = `rm -rf ${path}`;
    await this.#sh.trySh(cmd);
  };
}
