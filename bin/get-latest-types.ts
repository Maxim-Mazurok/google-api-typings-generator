import {ensureDirectoryExists} from '../src/utils';
import {resolve} from 'path';
import {SH} from './auto-update/sh';
import {Settings as GitSettings, Git} from './auto-update/git';
import {TypesBranchAndDirSettings} from './auto-update';

const pathToTypes = resolve(process.cwd(), process.argv[2]);

const settings: GitSettings & TypesBranchAndDirSettings = {
  user: 'Maxim-Mazurok',
  auth: process.env.GH_AUTH_TOKEN || '', // token is optional
  thisRepo: 'google-api-typings-generator',
  typesBranchName: 'types',
  typesDirName: 'types',
};

const sh = new SH();
const git = new Git(sh, settings);

(async () => {
  const {
    user: owner,
    thisRepo: repo,
    typesBranchName: branch,
    typesDirName,
  } = settings;
  const commitSHA = await git.getLatestCommitHash({
    owner,
    repo,
    branch,
  });
  const url = await git.getArchiveLink(commitSHA);
  ensureDirectoryExists(pathToTypes);
  const cmd = `curl ${url} | tar xvz --strip-components=1 -C ${typesDirName}`;
  await sh.trySh(cmd);
})();
