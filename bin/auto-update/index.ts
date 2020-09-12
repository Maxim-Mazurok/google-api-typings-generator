import {join, resolve} from 'path';
import {SH} from './sh';
import {Git, Settings as GitSettings} from './git';
import {Helpers, getTmpBranchName} from './helpers';
import {GitHelpers} from './gitHelpers';
import {TYPE_PREFIX} from '../../src/utils';
import {supportedApis} from './config';

if (!process.env.GH_AUTH_TOKEN) {
  throw new Error('Please, set env var: GH_AUTH_TOKEN');
}

if (!process.env.GH_AUTH_TOKEN_BOT) {
  throw new Error('Please, set env var: GH_AUTH_TOKEN_BOT');
}

export interface TypesBranchAndDirSettings {
  typesDirName: string; // directory name in DT
  typesBranchName: string; // branch name where generated types are in the generator repo
}

export interface Settings extends GitSettings, TypesBranchAndDirSettings {
  userEmail: string; // email used for git config
  userName: string; // full name used for git config
  dtForkPath: string; // full path to the local DT fork folder
  tempTypesDirName: string; // temporary directory name to download types branch to
  dtRepoOwner: string; // DefinitelyTyped repo owner name only
  dtRepoName: string; // DefinitelyTyped repo name only
  pullRequestTemplateSHA: string; // SHA of PULL_REQUEST_TEMPLATE.md file from DT
  templateUpdateLabel: string; // label for issues regarding PR template update
  authBot: string; // GH token for bot account (that will open PRs) with public_repo access and with collaborator access to the DT fork
  botUser: string; // bot account username (that will open PRs)
}

const settings: Settings = {
  dtForkPath: join(resolve(__dirname, '../..'), 'dt-fork'), // TODO: maybe use require('os').tmpdir() or something like that
  typesDirName: 'types',
  tempTypesDirName: 'temp-types',
  typesBranchName: 'types',
  user: 'Maxim-Mazurok',
  userEmail: 'maxim@mazurok.com',
  userName: 'Maxim Mazurok',
  auth: process.env.GH_AUTH_TOKEN,
  botUser: 'google-api-typings-generator',
  authBot: process.env.GH_AUTH_TOKEN_BOT,
  dtRepoOwner: 'DefinitelyTyped',
  dtRepoName: 'DefinitelyTyped',
  thisRepo: 'google-api-typings-generator',
  pullRequestTemplateSHA: 'b009fe3dc1ccc1067842f50dba7222fcb1cc6b96',
  templateUpdateLabel: 'DT PR template update',
};

const supportedTypes = supportedApis.map(x => `${TYPE_PREFIX}${x}`);

const sh = new SH(settings.dtForkPath);
const git = new Git(sh, settings);
const gitHelpers = new GitHelpers(git, settings);
const helpers = new Helpers(sh, git, settings);

process.on('unhandledRejection', reason => {
  throw reason;
});

(async () => {
  // Initialize
  await gitHelpers.cloneDTFork();
  await gitHelpers.setConfig();
  await gitHelpers.updateDTFork();
  await helpers.copyTypesBranchFromGeneratorToDTFork();
  await helpers.runDTTests();

  // Do the job
  const changedTypes = await git.getChangedTypes(); // TODO: types changed relative to master, but branches might already have latest changes, maybe try to detect this
  const branches = await git.getBranches();
  console.log({branches, changedTypes});

  for (const type of changedTypes) {
    const isNewBranch = branches.indexOf(type) === -1;
    if (isNewBranch) {
      await git.checkoutBranch(type, {createOrReset: true, from: 'master'}); // so that new branch will be created from master and not from previous gapi.client.* branch
      await gitHelpers.stageTypesFolder(type);
    } else {
      await git.checkoutBranch('master');
      await gitHelpers.stageTypesFolder(type);
      await git.stash({keepIndex: true, name: 'all-changes'}); // #1 contains all changes
      await git.stash({keepIndex: false}); // #0 contains only staged changes
      await git.checkoutBranch(getTmpBranchName(type), {
        // create new temporary branch
        createOrReset: true, // so that existing branch will be reset to master and not continue own history
        from: 'master',
      });
      await git.popStash({force: true}); // #0 applies staged changes and drops stash
      await git.popStash(); // #1 pops all changes
    }

    await git.commit({
      message: `automatic ${type} update @ ${new Date().toUTCString()}`,
      stageAllFirst: false,
    });

    if (!isNewBranch) {
      if (await git.tmpAndOriginBranchesDiffer(type)) {
        // if type definition actually changed - update branch
        await git.moveBranch(getTmpBranchName(type), type);
      } else {
        // else - delete temp branch
        await git.checkoutBranch('master');
        await git.deleteBranch(getTmpBranchName(type), {force: true});
      }
    }
  }

  for (const type of changedTypes) {
    if (supportedTypes.indexOf(type) === -1) {
      continue;
    }

    await gitHelpers.pushAndOpenPRIfItDoesNotExistAndIfNotOnlyRevisionChanged(
      type
    );
  }

  // approve and merge PRs
  const pullsWaitingForApproval = await git.get100LatestPRsWaitingForReview(
    settings.dtRepoOwner,
    settings.dtRepoName,
    settings.user,
    settings.botUser
  );
  for (const pullNumber of pullsWaitingForApproval) {
    await git.approvePR(settings.dtRepoOwner, settings.dtRepoName, pullNumber);
    await git.commentReadyToMerge(
      settings.dtRepoOwner,
      settings.dtRepoName,
      pullNumber
    );
  }

  await gitHelpers.checkForTemplateUpdate();
})();
