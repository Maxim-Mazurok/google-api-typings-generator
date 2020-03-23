/*
Clone DT fork:

git clone --depth=1 https://github.com/Maxim-Mazurok/DefinitelyTyped --no-single-branch # clone only last commit for every branch

*/

/*
Rebase master:

cd DefinitelyTyped
git remote add upstream https://github.com/DefinitelyTyped/DefinitelyTyped
DATE_SINCE=$(git log -1 --format="%cd" --date=unix) # get time of the last commit to origin
git fetch upstream master --shallow-since=$DATE_SINCE # update master from upstream since last commit to origin (to have all required history for push)
git reset --hard upstream/master # reset fork to upstream
git push # actually update master

*/

/*
Copy "types" branch of generator fork
curl https://codeload.github.com/Maxim-Mazurok/google-api-typings-generator/tar.gz/types | tar xvz -
rsync -a google-api-typings-generator-types/ types/ # TODO: handle deleted files
rm -rf google-api-typings-generator-types # remove original folder after copying
git add -A # add all modified/added files to git
git commit -m "tmp" # commit changes so that test runner can detect what changed
npm i # install required packages to run tests (no `npm ci` because https://github.com/DefinitelyTyped/DefinitelyTyped/pull/30476#issuecomment-593053174)
npm test # run DT test runner on changed types # TODO: might want to delete non-gapi types to speed up parsing phase
git reset HEAD^ --quiet # undo last commit
# use parse-git-status to find all changed types

For each type without branch:
git checkout -b gapi.client.TYPE_NAME
git add types/gapi.client.TYPE_NAME
git commit -m "automatic types update @ {yyyy-mm-dd hh:mm}"
*/

import path from 'path';
import parseGitStatus from 'parse-git-status';
import spawnAsync from '@expo/spawn-async';
import { typingsPrefix } from '../src/app';

const settings: {
  cwd?: string;
  typesDirName?: string; // directory path in DT
} = {
  cwd: '/Users/maxim/IdeaProjects/dt-fork',
};

class TypesAutoPr {
  readonly #cwd: string;

  constructor(cwd?: string) {
    this.#cwd = cwd || path.resolve(__dirname, '../DefinitelyTyped');
  }

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
    { create }: { create: boolean } = { create: false }
  ): Promise<void> => {
    console.log(`git checkout ${create ? '-B ' : ''}${name}`);
    // validate branch name: https://stackoverflow.com/a/12093994/4536543
    if ((await this.checkBranchFormat(name)) === false) {
      throw new Error(`Invalid branch name: ${name}`);
    }
    try {
      await spawnAsync('git', ['checkout', ...(create ? ['-B'] : []), name], {
        cwd: this.#cwd,
      });
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

  commit = async (): Promise<void> => {
    console.log(`git commit -m automatic types update @ DATETIME`);
    try {
      await spawnAsync(
        'git',
        [
          'commit',
          '-m',
          `automatic types update @ ${new Date().toUTCString()}`,
        ],
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

  pushAll = async (): Promise<void> => {
    console.log(`git push --all origin`);
    try {
      await spawnAsync('git', ['push', '--all', 'origin'], {
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
  const app = new TypesAutoPr(settings.cwd);
  const changedTypes = await app.getChangedTypes();
  const branches = await app.getBranches();
  console.log({ branches, changedTypes });

  for (const type of changedTypes) {
    await app.checkoutBranch('master'); // checkout master first
    const isNewBranch = branches.indexOf(type) === -1;
    if (isNewBranch) {
      await app.checkoutBranch(type, { create: true }); // so that new branch will be created from master and not from previous gapi.client.* branch
      await app.stageTypesFolder(type);
    } else {
      await app.stageTypesFolder(type);
      await app.stash({ keepIndex: true }); // #1 contains all changes
      await app.stash(); // #0 contains only staged changes
      await app.checkoutBranch(type);
      await app.popStash({ force: true }); // #0 applies staged changes
      await app.dropStash(); // #0 drops stash that we force-applied
      await app.popStash(); // #1 pops all changes
    }

    await app.commit();
  }

  await app.pushAll(); // pushes to fork
})();
