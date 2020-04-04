import { join, resolve } from 'path';
import { SH } from './sh';
import { Git, Settings as GitSettings } from './git';
import { Helpers } from './helpers';
import { GitHelpers } from './gitHelpers';

if (!process.env.GH_AUTH_TOKEN) {
  throw new Error('Please, set env var: GH_AUTH_TOKEN');
}

export interface TypesBranchAndDirSettings {
  typesDirName: string; // directory name in DT
  typesBranchName: string; // branch name where generated types are in the generator repo
}

export interface Settings extends GitSettings, TypesBranchAndDirSettings {
  dtForkPath: string; // full path to the local DT fork folder
  tempTypesDirName: string; // temporary directory name to download types branch to
  dtRepoOwner: string; // DefinitelyTyped repo owner name only
  dtRepoName: string; // DefinitelyTyped repo name only
  pullRequestTemplateSHA: string; // SHA of PULL_REQUEST_TEMPLATE.md file from DT
  templateUpdateLabel: string; // label for issues regarding PR template update
}

const settings: Settings = {
  dtForkPath: join(resolve(__dirname, '../..'), 'dt-fork'), // TODO: maybe use require('os').tmpdir() or something like that
  typesDirName: 'types',
  tempTypesDirName: 'temp-types',
  typesBranchName: 'types',
  user: 'Maxim-Mazurok',
  auth: process.env.GH_AUTH_TOKEN,
  dtRepoOwner: 'DefinitelyTyped',
  dtRepoName: 'DefinitelyTyped',
  thisRepo: 'google-api-typings-generator',
  pullRequestTemplateSHA: 'ab3f84d44f18d1f33cc79c5d857067b939813c7e',
  templateUpdateLabel: 'DT PR template update',
};

const sh = new SH(settings.dtForkPath);
const git = new Git(sh, settings);
const gitHelpers = new GitHelpers(git, settings);
const helpers = new Helpers(sh, git, settings);

(async () => {
  // Initialize
  await gitHelpers.cloneDTFork();
  await gitHelpers.updateDTFork();
  await helpers.copyTypesBranchFromGeneratorToDTFork();
  //await helpers.runDTTests();

  // Do the job
  const changedTypes = await git.getChangedTypes(); // TODO: types changed relative to master, but branches might already have latest changes, maybe try to detect this
  const branches = await git.getBranches();
  console.log({ branches, changedTypes });

  for (const type of changedTypes) {
    const isNewBranch = branches.indexOf(type) === -1;
    if (isNewBranch) {
      await git.checkoutBranch(type, { create: true, from: 'master' }); // so that new branch will be created from master and not from previous gapi.client.* branch
      await gitHelpers.stageTypesFolder(type);
    } else {
      await git.checkoutBranch('master');
      await gitHelpers.stageTypesFolder(type);
      await git.stash({ keepIndex: true }); // #1 contains all changes
      await git.stash(); // #0 contains only staged changes
      await git.checkoutBranch(type);
      await git.popStash({ force: true }); // #0 applies staged changes and drops stash
      await git.popStash(); // #1 pops all changes
    }

    await git.commit({
      message: `automatic ${type} update @ ${new Date().toUTCString()}`,
      stageAllFirst: false,
    });
  }

  await git.push({ all: true }); // pushes to fork

  for (const type of changedTypes) {
    await gitHelpers.openPRIfItDoesNotExist(type);
  }

  await gitHelpers.checkForTemplateUpdate();
})();
