// Run CLI using @expo/spawn-async

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
rm -f google-api-typings-generator-types/.gitkeep # TODO: find a better way to not include this file
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
}

(async () => {
  const app = new TypesAutoPr('/Users/maxim/IdeaProjects/dt-fork');
  const types = await app.getChangedTypes();
  const branches = await app.getBranches();
  console.log({ types, branches });

  types.forEach(type => {
    if (branches.indexOf(type) === -1) {
      //TODO: create branch
    } else {
      //TODO: update branch
    }
  });
})();
