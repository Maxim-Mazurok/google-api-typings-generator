import {SH} from './sh';
import {typingsPrefix} from '../../src/app';
import {basename, parse} from 'path';
import parseGitStatus from 'parse-git-status';
import {Octokit} from '@octokit/rest';
import {tmpBranchNameFunc} from './helpers';

export interface Settings {
  user: string; // user who submits PRs to DT
  auth: string; // GH token with public_repo access
  thisRepo: string; // repo form where API calls to GH will be made
}

export class Git {
  readonly settings: Settings;
  readonly sh: SH;
  readonly octokit: Octokit;

  constructor(sh: SH, settings: Settings) {
    this.sh = sh;
    this.settings = settings;

    const {user, auth, thisRepo} = this.settings;
    this.octokit = new Octokit({
      auth,
      userAgent: `${user}/${thisRepo}`,
      timeZone: 'UTC',
    });
  }

  deleteBranch = async (
    branch: string,
    {force}: {force: boolean} = {force: false}
  ): Promise<void> => {
    const cmd = `git branch --delete ${force ? '--force' : ''} ${branch}`;
    await this.sh.trySh(cmd);
  };

  moveBranch = async (from: string, to: string): Promise<void> => {
    const cmd = `git branch -m ${from} ${to}`;
    await this.sh.trySh(cmd);
  };

  tmpAndOriginBranchesDiffer = async (type: string): Promise<boolean> => {
    const cmd = `git diff origin/${type}..${tmpBranchNameFunc(
      type
    )} --quiet types/${type}/*`;
    try {
      await this.sh.runSh(cmd);
    } catch (e) {
      // exited with status != 0
      return true;
    }
    // no exception => exit status == 0
    return false;
  };

  getArchiveLink = async (commitSHA: string): Promise<string> => {
    console.log(`Getting archive link for ${commitSHA}...`);

    const {user: owner, thisRepo: repo} = this.settings;
    const response = await this.octokit.repos.getArchiveLink({
      owner,
      repo,
      ref: commitSHA,
      archive_format: 'tarball',
      method: 'HEAD',
    });
    return response.url;
  };

  getLatestCommitHash = async ({
    owner,
    repo,
    branch,
  }: {
    owner: string;
    repo: string;
    branch: string;
  }): Promise<string> => {
    console.log(`Getting latest commit SHA for ${owner}/${repo}/${branch}...`);

    const branchData = await this.octokit.repos.getBranch({
      owner,
      repo,
      branch,
    });

    return branchData.data.commit.sha;
  };

  getChangedTypes = async (): Promise<string[]> => {
    const gitStatus = await this.getGitStatus();
    const status = parseGitStatus(gitStatus);
    return [...new Set(status.map(x => basename(parse(x.to).dir)))].filter(
      x => x.indexOf(typingsPrefix) === 0
    );
  };

  getGitStatus = async (): Promise<string> => {
    const cmd = 'git status --porcelain -z';
    return (await this.sh.trySh(cmd)).stdout;
  };

  getDateSince = async (): Promise<string> => {
    // get time of the last commit to origin
    const cmd = 'git log -1 --format="%cd" --date=unix';
    return (await this.sh.trySh(cmd)).stdout.replace(/\s/g, '');
  };

  updateDTForkFromUpstream = async (dateSince: string): Promise<void> => {
    // update master from upstream since last commit to origin (to have all required history for push)
    const cmd = `git fetch upstream master --shallow-since=${dateSince}`;
    await this.sh.trySh(cmd);
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
    await this.sh.trySh(cmd);
  };

  getBranches = async (): Promise<string[]> => {
    const {stdout} = await this.sh.trySh('git branch --list -r origin/*');
    return stdout
      .split('\n')
      .filter(x => x !== '')
      .map(x => x.trim().replace('origin/', ''))
      .filter(x => x.indexOf(typingsPrefix) === 0);
  };

  checkBranchFormat = async (name: string): Promise<boolean> => {
    try {
      await this.sh.runSh(`git check-ref-format --branch ${name}`);
    } catch (e) {
      // exited with status != 0
      return false;
    }
    // no exception => exit status == 0
    return true;
  };

  checkoutBranch = async (
    name: string,
    {createOrReset, from}: {createOrReset?: boolean; from?: string} = {}
  ): Promise<void> => {
    if ((await this.checkBranchFormat(name)) === false) {
      throw new Error(`Invalid branch name: ${name}`);
    }
    if (from && (await this.checkBranchFormat(from)) === false) {
      throw new Error(`Invalid branch from name: ${from}`);
    }

    const cmd = `git checkout ${createOrReset ? '-B' : ''} ${name} ${
      from || ''
    }`;
    await this.sh.trySh(cmd);
  };

  addAll = async (): Promise<void> => {
    const cmd = 'git add --all';
    await this.sh.trySh(cmd);
  };

  commit = async ({
    message,
    stageAllFirst,
  }: {
    message: string;
    stageAllFirst: boolean;
  }): Promise<void> => {
    if (stageAllFirst) {
      await this.addAll(); // make sure that newly added files are also staged
    }

    const cmd = `git commit -m "${message}"`;
    try {
      await this.sh.runSh(cmd);
    } catch (e) {
      if (
        e &&
        e.stdout &&
        e.stdout.indexOf('Your branch is up to date') !== -1
      ) {
        console.warn('Branch is up to date already');
      } else {
        throw this.sh.error(e);
      }
    }
  };

  push = async ({
    all,
    force,
  }: {
    all?: boolean;
    force?: boolean;
  } = {}): Promise<void> => {
    const cmd = `git push ${all ? '--all' : ''} ${
      force ? '--force' : ''
    } origin`;
    await this.sh.trySh(cmd);
  };

  stash = async (
    {keepIndex, name}: {keepIndex: boolean; name?: string} = {
      keepIndex: false,
    }
  ): Promise<void> => {
    process.env.DEBUG && (await this.listStash());
    const cmd = `git stash push ${keepIndex ? '--keep-index' : ''} ${
      name ? `--message ${name}` : ''
    }`;
    await this.sh.trySh(cmd);
    process.env.DEBUG && (await this.listStash());
  };

  dropStash = async (): Promise<void> => {
    process.env.DEBUG && (await this.listStash());
    const cmd = 'git stash drop';
    await this.sh.trySh(cmd);
    process.env.DEBUG && (await this.listStash());
  };

  popStash = async (
    {force}: {force: boolean} = {force: false}
  ): Promise<void> => {
    process.env.DEBUG && (await this.listStash());
    const cmd = force ? 'git checkout stash -- .' : 'git stash pop';
    await this.sh.trySh(cmd);
    if (force) {
      process.env.DEBUG && (await this.listStash());
      await this.dropStash(); // make the stash actually pop
    }
    process.env.DEBUG && (await this.listStash());
  };

  listStash = async (): Promise<void> => {
    await this.sh.trySh('git stash list');
  };
}
