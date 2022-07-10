import {join} from 'node:path';
import {SH} from './sh.js';
import {Git, Settings as GitSettings} from './git.js';
import {Helpers} from './helpers.js';
import {TYPE_PREFIX} from '../../src/utils.js';
import {supportedApis} from './config.js';

if (!process.env.NPM_PUBLISH_AUTOMATION_TOKEN) {
  throw new Error('Please, set env var: NPM_PUBLISH_AUTOMATION_TOKEN');
}

export interface TypesBranchAndDirSettings {
  typesBranchName: string; // branch name where generated types are in the generator repo
  typesDirName: string; // temporary directory name to download types branch to
}

export interface Settings extends GitSettings, TypesBranchAndDirSettings {}

const settings: Settings = {
  typesDirName: 'types',
  typesBranchName: 'types',
  user: 'Maxim-Mazurok',
  auth: process.env.GH_AUTH_TOKEN || '', // token is optional
  thisRepo: 'google-api-typings-generator',
};

const supportedTypes = supportedApis.map(x => `${TYPE_PREFIX}${x}`);

const sh = new SH();
const git = new Git(sh, settings);
const helpers = new Helpers(sh, git, settings);

process.on('unhandledRejection', reason => {
  throw reason;
});

// Initialize
await helpers.downloadTypesBranch();

// Do the job
const allTypes = helpers.getAllTypes();
console.log({allTypes});

for (const type of allTypes) {
  if (!supportedTypes.includes(type)) {
    continue;
  }

  console.log(`Publishing ${type}...`);
  await helpers.npmPublish(join(process.cwd(), settings.typesDirName, type));
}
