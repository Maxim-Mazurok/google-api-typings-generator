import {join} from 'node:path';
import {getNpmArchivesToPublish} from '../../src/utils.js';
import {GitHub, GitHubSettings} from './git-hub.js';
import {Helpers} from './helpers.js';
import {SH} from './sh.js';

if (!process.env.NPM_PUBLISH_AUTOMATION_TOKEN) {
  throw new Error('Please, set env var: NPM_PUBLISH_AUTOMATION_TOKEN');
}

export interface TypesBranchAndDirSettings {
  typesBranchName: string; // branch name where generated types are in the generator repo
  typesDirName: string; // temporary directory name to download types branch to
}

export interface Settings extends GitHubSettings, TypesBranchAndDirSettings {}

const settings: Settings = {
  typesDirName: 'types',
  typesBranchName: 'types',
  user: 'Maxim-Mazurok',
  auth: process.env.GH_AUTH_TOKEN || '', // token is optional
  thisRepo: 'google-api-typings-generator',
};

const sh = new SH();
const gitHub = new GitHub(settings);
const helpers = new Helpers(sh, gitHub, settings);

process.on('unhandledRejection', reason => {
  throw reason;
});

void (async () => {
  // Initialize
  await helpers.downloadTypesBranch();

  // Do the job
  const allTypes = helpers.getAllTypes();
  console.log(JSON.stringify({allTypes}, null, 2));
  const latestVersion = (await import('latest-version')).default;
  const npmArchivesToPublish = await getNpmArchivesToPublish(
    allTypes,
    latestVersion,
    sh,
  );
  console.log(JSON.stringify({npmArchivesToPublish}, null, 2));

  for (const npmArchivePath of npmArchivesToPublish) {
    console.log(`Publishing ${npmArchivePath}...`);
    await helpers.npmPublish(npmArchivePath);
  }
})();
