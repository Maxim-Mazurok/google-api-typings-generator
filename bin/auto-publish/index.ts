import {join} from 'path';
import {SH} from './sh';
import {Git, Settings as GitSettings} from './git';
import {Helpers} from './helpers';
import {TYPE_PREFIX} from '../../src/utils';
import {supportedApis} from './config';

if (!process.env.GH_AUTH_TOKEN) {
  throw new Error('Please, set env var: GH_AUTH_TOKEN');
}

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
  auth: process.env.GH_AUTH_TOKEN,
  thisRepo: 'google-api-typings-generator',
};

const supportedTypes = supportedApis.map(x => `${TYPE_PREFIX}${x}`);

const sh = new SH();
const git = new Git(sh, settings);
const helpers = new Helpers(sh, git, settings);

process.on('unhandledRejection', reason => {
  throw reason;
});

(async () => {
  // Initialize
  await helpers.downloadTypesBranch();

  // Do the job
  const allTypes = helpers.getAllTypes();

  for (const type of allTypes) {
    if (supportedTypes.indexOf(type) === -1) {
      continue;
    }

    helpers.npmPublish(join(process.cwd(), settings.typesDirName, type));
  }
})();
