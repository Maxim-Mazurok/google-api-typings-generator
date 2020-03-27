// pirec55419@svpmail.com

import path from 'path';
import process from 'process';
import parseGitStatus from 'parse-git-status';
import spawnAsync from '@expo/spawn-async';
import { typingsPrefix } from '../src/app';
import { openPRIfItDoesntExist } from './gh-api';

if (!process.env.GH_AUTH_TOKEN) {
  throw new Error('Please, set env var: GH_AUTH_TOKEN');
}

const settings: {
  cwd: string;
  typesDirName?: string; // directory path in DT
  user: string; // user who submits PRs to DT
  auth: string; // GH public token
  dtRepoOwner: string; // DefinitelyTyped repo owner name only
  dtRepoName: string; // DefinitelyTyped repo name only
  thisRepo: string; // repo form where API calls to GH will be made
} = {
  cwd: path.join(path.resolve(__dirname, '..'), 'dt-fork'),
  user: 'Maxim-Mazurok',
  auth: process.env.GH_AUTH_TOKEN,
  dtRepoOwner: 'test-user-delete-me-please', // TODO: change this to: 'DefinitelyTyped'
  dtRepoName: 'DefinitelyTyped',
  thisRepo: 'google-api-typings-generator',
};

class TypesAutoPr {
  readonly #cwd: string;

  constructor(cwd?: string) {
    this.#cwd = cwd || path.resolve(__dirname, `/../${settings.dtRepoName}`);
  }

  cloneDTFork = async (): Promise<void> => {
    // clone only last commit for every branch
    console.log(
      `git clone --depth=1 https://github.com/${settings.user}/${settings.dtRepoName} --no-single-branch ${settings.cwd}`
    );
    await spawnAsync('git', [
      'clone',
      '--depth=1',
      `https://github.com/${settings.user}/${settings.dtRepoName}`,
      '--no-single-branch',
      settings.cwd,
    ]);
  };

  updateDTFork = async (): Promise<void> => {
    // Rebase master
    await this.addRemote();
    const dateSince = await this.getDateSince();
    await this.updateDTForkFromUpstream(dateSince);
    await this.gitReset({ hard: true, to: 'upstream/master', quiet: false }); // reset fork to upstream
    await this.push({ all: false });
  };

  addRemote = async (): Promise<void> => {
    console.log(
      `git remote add upstream https://github.com/${settings.dtRepoOwner}/${settings.dtRepoName}`
    );
    await spawnAsync(
      'git',
      [
        'remote',
        'add',
        'upstream',
        `https://github.com/${settings.dtRepoOwner}/${settings.dtRepoName}`,
      ],
      {
        cwd: this.#cwd,
      }
    );
  };

  getDateSince = async (): Promise<string> => {
    // get time of the last commit to origin
    console.log(`git log -1 --format="%cd" --date=unix`);
    const { stdout } = await spawnAsync(
      'git',
      ['log', '-1', '--format="%cd"', '--date=unix'],
      {
        cwd: this.#cwd,
      }
    );
    return stdout.replace(/\s/g, '');
  };

  updateDTForkFromUpstream = async (dateSince: string): Promise<void> => {
    // update master from upstream since last commit to origin (to have all required history for push)
    console.log(`git fetch upstream master --shallow-since=${dateSince}`);
    await spawnAsync(
      'git',
      ['fetch', 'upstream', 'master', `--shallow-since=${dateSince}`],
      {
        cwd: this.#cwd,
      }
    );
  };

  gitReset = async ({
    hard,
    to,
    quiet,
  }: {
    hard: boolean;
    to: string;
    quiet: boolean;
  }): Promise<void> => {
    console.log(
      `git reset ${hard ? '--hard' : ''} ${to} ${quiet ? '--quiet' : ''}`
    );
    await spawnAsync(
      'git',
      ['reset', ...(hard ? ['--hard'] : []), to, ...(quiet ? ['--quiet'] : [])],
      {
        cwd: this.#cwd,
      }
    );
  };

  copyTypesBranchFromGeneratorToDTFork = async (): Promise<void> => {
    await this.downloadTypesBranch();
    await this.copyTypesBranchToDTFork(); // TODO: handle deleted files?
    await this.deleteFolder(`${settings.thisRepo}-types`); // remove original folder after copying
    await this.commit({ message: 'tmp', all: true }); // commit all modified/added files so that test runner can detect what changed
    // await this.npm('install'); // install required packages to run tests (no `npm ci` because https://github.com/DefinitelyTyped/DefinitelyTyped/pull/30476#issuecomment-593053174)
    // await this.npm('test'); // run DT test runner on changed types
    await this.gitReset({ hard: false, to: 'HEAD^', quiet: true }); // undo last commit
  };

  npm = async (command: 'i' | 'install' | 'test'): Promise<void> => {
    console.log(`npm ${command}`);
    await spawnAsync('npm', [command], {
      cwd: this.#cwd,
    });
  };

  downloadTypesBranch = async (): Promise<void> => {
    console.log(
      `curl https://codeload.github.com/${settings.user}/${settings.thisRepo}/tar.gz/types | tar xvz -`
    );
    await spawnAsync(
      'sh',
      [
        '-c',
        `curl https://codeload.github.com/${settings.user}/${settings.thisRepo}/tar.gz/types | tar xvz -`,
      ],
      {
        cwd: this.#cwd,
      }
    );
  };

  copyTypesBranchToDTFork = async (): Promise<void> => {
    console.log(`rsync -a ${settings.thisRepo}-types/ types/`);
    await spawnAsync('rsync', ['-a', `${settings.thisRepo}-types/`, 'types/'], {
      cwd: this.#cwd,
    });
  };

  deleteFolder = async (path: string): Promise<void> => {
    console.log(`rm -rf ${path}`);
    await spawnAsync('rm', ['-rf', `${path}`], {
      cwd: this.#cwd,
    });
  };

  getChangedTypes = async (): Promise<string[]> => {
    const { stdout } = await spawnAsync(
      'git',
      ['status', '--porcelain', '-z'],
      {
        cwd: this.#cwd,
      }
    );
    const status = parseGitStatus(stdout);
    return [
      ...new Set(status.map(x => path.basename(path.parse(x.to).dir))),
    ].filter(x => x.indexOf(typingsPrefix) === 0);
  };

  getBranches = async (): Promise<string[]> => {
    const { stdout } = await spawnAsync(
      'git',
      ['branch', '--list', '-r', 'origin/*'],
      {
        cwd: this.#cwd,
      }
    );
    return stdout
      .split('\n')
      .filter(x => x !== '')
      .map(x => x.trim().replace('origin/', ''))
      .filter(x => x.indexOf(typingsPrefix) === 0);
  };

  checkBranchFormat = async (name: string): Promise<boolean> => {
    try {
      await spawnAsync('git', ['check-ref-format', '--branch', name]);
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
    console.log(`git checkout ${create ? '-B' : ''} ${name} ${from || ''}`);
    if ((await this.checkBranchFormat(name)) === false) {
      throw new Error(`Invalid branch name: ${name}`);
    }
    if (from && (await this.checkBranchFormat(from)) === false) {
      throw new Error(`Invalid branch from name: ${from}`);
    }
    try {
      await spawnAsync(
        'git',
        ['checkout', ...(create ? ['-B'] : []), name, ...(from ? [from] : [])],
        {
          cwd: this.#cwd,
        }
      );
    } catch (e) {
      throw new Error(`An error occured:
      Error: ${e.stderr}
      Output: ${e.stdout}`);
    }
  };

  stageTypesFolder = async (name: string): Promise<void> => {
    console.log(`git add types/${name}`);
    //TODO: edge case: if user staged all changes manually - we might want to unstage all first before adding current folder
    try {
      // create or switch to existing branch
      await spawnAsync(
        'git',
        ['add', path.join(settings.typesDirName || 'types', name)],
        {
          cwd: this.#cwd,
        }
      );
    } catch (e) {
      throw new Error(`An error occured:
      Error: ${e.stderr}
      Output: ${e.stdout}`);
    }
  };

  commit = async ({
    message,
    all,
  }: {
    message: string;
    all: boolean;
  }): Promise<void> => {
    console.log(`git commit -m "${message}" ${all ? '--all' : ''}`);
    try {
      await spawnAsync(
        'git',
        ['commit', '-m', `"${message}"`, ...(all ? ['--all'] : [])],
        {
          cwd: this.#cwd,
        }
      );
    } catch (e) {
      if (e.stdout.indexOf('Your branch is up to date') !== -1) {
        console.warn('Branch is up to date already');
      } else {
        throw new Error(`An error occured:
      Error: ${e.stderr}
      Output: ${e.stdout}`);
      }
    }
  };

  push = async ({ all }: { all: boolean }): Promise<void> => {
    console.log(`git push ${all ? '--all' : ''} origin`);
    try {
      await spawnAsync('git', ['push', ...(all ? ['--all'] : []), 'origin'], {
        cwd: this.#cwd,
      });
    } catch (e) {
      throw new Error(`An error occured:
      Error: ${e.stderr}
      Output: ${e.stdout}`);
    }
  };

  stash = async (
    { keepIndex }: { keepIndex: boolean } = { keepIndex: false }
  ): Promise<void> => {
    console.log(`git stash ${keepIndex ? '--keep-index' : ''}`);
    try {
      await spawnAsync(
        'git',
        ['stash', ...(keepIndex ? ['--keep-index'] : [])],
        {
          cwd: this.#cwd,
        }
      );
    } catch (e) {
      throw new Error(`An error occured:
      Error: ${e.stderr}
      Output: ${e.stdout}`);
    }
  };

  dropStash = async (): Promise<void> => {
    console.log(`git stash drop`);
    try {
      await spawnAsync('git', ['stash', 'drop'], {
        cwd: this.#cwd,
      });
    } catch (e) {
      throw new Error(`An error occured:
      Error: ${e.stderr}
      Output: ${e.stdout}`);
    }
  };

  popStash = async (
    { force }: { force: boolean } = { force: false }
  ): Promise<void> => {
    console.log(force ? `git checkout stash -- .` : `git stash pop`);
    try {
      await spawnAsync(
        'git',
        force ? ['checkout', 'stash', '--', '.'] : ['stash', 'pop'],
        {
          cwd: this.#cwd,
        }
      );
    } catch (e) {
      throw new Error(`An error occured:
      Error: ${e.stderr}
      Output: ${e.stdout}`);
    }
  };
}

(async () => {
  // Initialize

  const app = new TypesAutoPr(settings.cwd);
  try {
    await app.cloneDTFork();
    await app.updateDTFork();
    await app.copyTypesBranchFromGeneratorToDTFork();
  } catch (e) {
    throw new Error(`An error occured:
      Error: ${e.stderr}
      Output: ${e.stdout}`);
  }

  // Do the job

  const changedTypes = await app.getChangedTypes(); // TODO: types changed relative to master, but branches might already have latest changes, maybe try to detect this
  const branches = await app.getBranches();
  console.log({ branches, changedTypes });

  for (const type of changedTypes) {
    const isNewBranch = branches.indexOf(type) === -1;
    if (isNewBranch) {
      await app.checkoutBranch(type, { create: true, from: 'master' }); // so that new branch will be created from master and not from previous gapi.client.* branch
      await app.stageTypesFolder(type);
    } else {
      await app.checkoutBranch('master');
      await app.stageTypesFolder(type);
      await app.stash({ keepIndex: true }); // #1 contains all changes
      await app.stash(); // #0 contains only staged changes
      await app.checkoutBranch(type);
      await app.popStash({ force: true }); // #0 applies staged changes
      await app.dropStash(); // #0 drops stash that we force-applied
      await app.popStash(); // #1 pops all changes
    }

    await app.commit({
      message: `automatic ${type} update @ ${new Date().toUTCString()}`,
      all: false,
    });
  }

  await app.push({ all: true }); // pushes to fork

  for (const type of changedTypes) {
    await openPRIfItDoesntExist({
      user: settings.user,
      auth: settings.auth,
      dtRepoName: settings.dtRepoName,
      dtRepoOwner: settings.dtRepoOwner,
      gapiTypeName: type,
      thisRepo: settings.thisRepo,
    });
  }
})();
