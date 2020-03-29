import { SH } from './sh';
import { typingsPrefix } from '../../src/app';
import { join, basename, parse } from 'path';
import parseGitStatus from 'parse-git-status';
import { Settings } from './index';
import { Octokit } from '@octokit/rest';

export class Git {
  readonly #sh: SH;
  readonly #settings: Settings;
  readonly #octokit: Octokit;

  constructor(sh: SH, settings: Settings) {
    this.#sh = sh;
    this.#settings = settings;

    const { user, auth, thisRepo } = this.#settings;
    this.#octokit = new Octokit({
      auth,
      userAgent: `${user}/${thisRepo}`,
      timeZone: 'UTC',
    });
  }

  openPRIfItDoesntExist = async (gapiTypeName: string): Promise<void> => {
    const { user, dtRepoOwner: owner, dtRepoName: repo } = this.#settings;

    console.log(`Opening PR for ${gapiTypeName}...`);

    try {
      await this.#octokit.pulls.create({
        owner,
        repo,
        title: `[${gapiTypeName}] automatic update`,
        head: `${user}:${gapiTypeName}`,
        base: 'master',
        // TODO: check for updates in the template (using retrieveCommunityProfileMetrics from black-panther-preview, maybe) but it doesn't seem to be updated often
        body: `
  - [x] Use a meaningful title for the pull request. Include the name of the package modified.
  - [x] Test the change in your own code. (Compile and run.)
  - [x] Add or edit tests to reflect the change. (Run with \`npm test\`.)
  - [x] Follow the advice from the [readme](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.md#make-a-pull-request).
  - [x] Avoid [common mistakes](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.md#common-mistakes).
  - [x] Run \`npm run lint package-name\` (or \`tsc\` if no \`tslint.json\` is present).

  Select one of these and delete the others:

  If changing an existing definition:
  - [x] Provide a URL to documentation or source code which provides context for the suggested changes: https://github.com/Maxim-Mazurok/google-api-typings-generator#google-api-typings-generator
  - [x] If this PR brings the type definitions up to date with a new version of the JS library, update the version number in the header.
  - [x] If you are making substantial changes, consider adding a \`tslint.json\` containing \`{ "extends": "dtslint/dt.json" }\`. If for reason the any rule need to be disabled, disable it for that line using \`// tslint:disable-next-line [ruleName]\` and not for whole package so that the need for disabling can be reviewed.

  ----

  Please, note: this PR was created automatically by [Maxim-Mazurok/google-api-typings-generator](https://github.com/Maxim-Mazurok/google-api-typings-generator).
  Types are generated automatically from [Google API Discovery Service](https://developers.google.com/discovery).
  Before submitting this PR, types were linted and tested automatically.
  Alternatively, you can [use](https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/85#issuecomment-601133279) these typings from our [\`types\` branch](https://github.com/Maxim-Mazurok/google-api-typings-generator/tree/types) which gets updated, linted and tested every hour.
  In case if something is wrong with this PR or the template needs to be updated - please, [submit new issue](https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/new).
  `,
      });
    } catch (e) {
      if (
        e &&
        e.errors &&
        e.errors[0] &&
        e.errors[0].message &&
        e.errors[0].message.indexOf('pull request already exists') !== -1
      ) {
        console.warn(`Open PR for ${gapiTypeName} already exists`);
      } else {
        console.error(e);
        throw new Error(`Failed to open PR for ${gapiTypeName}`);
      }
    }
  };

  cloneDTFork = async (): Promise<void> => {
    // clone only last commit for every branch
    const { user, dtRepoName, dtForkPath } = this.#settings;
    const cmd = `git clone --depth=1 https://github.com/${user}/${dtRepoName} --no-single-branch ${dtForkPath}`;
    await this.#sh.trySh(cmd, __dirname);
  };

  updateDTFork = async (): Promise<void> => {
    // Rebase master
    await this.addRemote();
    const dateSince = await this.getDateSince();
    await this.updateDTForkFromUpstream(dateSince);
    await this.reset({ hard: true, to: 'upstream/master', quiet: false }); // reset fork to upstream
    await this.push({ all: false });
  };

  getChangedTypes = async (): Promise<string[]> => {
    const gitStatus = await this.getGitStatus();
    const status = parseGitStatus(gitStatus);
    return [...new Set(status.map(x => basename(parse(x.to).dir)))].filter(
      x => x.indexOf(typingsPrefix) === 0
    );
  };

  getGitStatus = async (): Promise<string> => {
    const cmd = `git status --porcelain -z`;
    return (await this.#sh.trySh(cmd)).stdout;
  };

  addRemote = async (): Promise<void> => {
    const { dtRepoOwner, dtRepoName } = this.#settings;
    const cmd = `git remote add upstream https://github.com/${dtRepoOwner}/${dtRepoName}`;
    await this.#sh.trySh(cmd);
  };

  getDateSince = async (): Promise<string> => {
    // get time of the last commit to origin
    const cmd = `git log -1 --format="%cd" --date=unix`;
    return (await this.#sh.trySh(cmd)).stdout.replace(/\s/g, '');
  };

  updateDTForkFromUpstream = async (dateSince: string): Promise<void> => {
    // update master from upstream since last commit to origin (to have all required history for push)
    const cmd = `git fetch upstream master --shallow-since=${dateSince}`;
    await this.#sh.trySh(cmd);
  };

  reset = async ({
    hard,
    to,
    quiet,
  }: {
    hard: boolean;
    to: string;
    quiet: boolean;
  }): Promise<void> => {
    const cmd = `git reset ${hard ? '--hard' : ''} ${to} ${
      quiet ? '--quiet' : ''
    }`;
    await this.#sh.trySh(cmd);
  };

  getBranches = async (): Promise<string[]> => {
    const { stdout } = await this.#sh.trySh(`git branch --list -r origin/*`);
    return stdout
      .split('\n')
      .filter(x => x !== '')
      .map(x => x.trim().replace('origin/', ''))
      .filter(x => x.indexOf(typingsPrefix) === 0);
  };

  checkBranchFormat = async (name: string): Promise<boolean> => {
    try {
      await this.#sh.runSh(`git check-ref-format --branch ${name}`);
    } catch (e) {
      // exited with status != 0
      return false;
    }
    // no exception => exit status == 0
    return true;
  };

  checkoutBranch = async (
    name: string,
    { create, from }: { create: boolean; from?: string } = { create: false }
  ): Promise<void> => {
    if ((await this.checkBranchFormat(name)) === false) {
      throw new Error(`Invalid branch name: ${name}`);
    }
    if (from && (await this.checkBranchFormat(from)) === false) {
      throw new Error(`Invalid branch from name: ${from}`);
    }

    const cmd = `git checkout ${create ? '-B' : ''} ${name} ${from || ''}`;
    await this.#sh.trySh(cmd);
  };

  stageTypesFolder = async (name: string): Promise<void> => {
    const { typesDirName } = this.#settings;
    const cmd = `git add ${join(typesDirName, name)}`;
    await this.#sh.trySh(cmd);
  };

  commit = async ({
    message,
    all,
  }: {
    message: string;
    all: boolean;
  }): Promise<void> => {
    const cmd = `git commit -m "${message}" ${all ? '--all' : ''}`;
    try {
      await this.#sh.runSh(cmd);
    } catch (e) {
      if (
        e &&
        e.stdout &&
        e.stdout.indexOf('Your branch is up to date') !== -1
      ) {
        console.warn('Branch is up to date already');
      } else {
        throw this.#sh.error(e);
      }
    }
  };

  push = async ({ all }: { all: boolean }): Promise<void> => {
    const cmd = `git push ${all ? '--all' : ''} origin`;
    await this.#sh.trySh(cmd);
  };

  stash = async (
    { keepIndex }: { keepIndex: boolean } = { keepIndex: false }
  ): Promise<void> => {
    const cmd = `git stash ${keepIndex ? '--keep-index' : ''}`;
    await this.#sh.trySh(cmd);
  };

  dropStash = async (): Promise<void> => {
    const cmd = `git stash drop`;
    await this.#sh.trySh(cmd);
  };

  popStash = async (
    { force }: { force: boolean } = { force: false }
  ): Promise<void> => {
    const cmd = force ? `git checkout stash -- .` : `git stash pop`;
    await this.#sh.trySh(cmd);
    if (force) {
      await this.dropStash(); // make the stach actually pop
    }
  };
}
