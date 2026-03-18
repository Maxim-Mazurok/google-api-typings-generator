import {NpmArchivesToPublishHelper} from '../../src/archives-to-publish.js';
import {generateTotp, npmApiLogin} from '../../src/npm-trusted-publishing.js';
import {getNpmArchivesToPublish} from '../../src/utils.js';
import {GitHub, GitHubSettings} from './git-hub.js';
import {Helpers} from './helpers.js';
import {SH} from './sh.js';
import {writeFileSync, rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';

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

const npmArchivesToPublishHelper = new NpmArchivesToPublishHelper(sh, settings);

process.on('unhandledRejection', reason => {
  throw reason;
});

void (async () => {
  // Generate npm session token from credentials for authentication fallback.
  // npm CLI will try OIDC first (for packages with trusted publishing configured),
  // and fall back to this token (for new packages or not-yet-configured ones).
  const npmUsername = process.env.NPM_USERNAME;
  const npmPassword = process.env.NPM_PASSWORD;
  const npmTotpSecret = process.env.NPM_TOTP_SECRET;

  let npmrcPath: string | undefined;
  if (npmUsername && npmPassword && npmTotpSecret) {
    console.log('Generating npm session token from credentials...');
    const otp = generateTotp(npmTotpSecret);
    const sessionToken = await npmApiLogin(npmUsername, npmPassword, otp);
    npmrcPath = join(tmpdir(), `.npmrc-auto-publish-${Date.now()}`); // cspell:words npmrc
    writeFileSync(
      npmrcPath,
      `//registry.npmjs.org/:_authToken=${sessionToken}\n`,
      {mode: 0o600},
    );
    console.log('npm session token written to temporary .npmrc');
  } else {
    console.log(
      'NPM credentials not provided; relying on OIDC authentication only',
    );
  }

  const helpers = new Helpers(sh, gitHub, settings, npmrcPath);

  try {
    // Initialize
    await helpers.downloadTypesBranch();

    // Do the job
    const allTypes = helpers.getAllTypes();
    console.log(JSON.stringify({allTypes}, null, 2));
    const npmArchivesToPublish = await getNpmArchivesToPublish(
      allTypes,
      npmArchivesToPublishHelper,
    );
    console.log(JSON.stringify({npmArchivesToPublish}, null, 2));

    for (const archivePath of npmArchivesToPublish) {
      console.log(`Publishing ${archivePath}...`);
      await helpers.npmPublish(archivePath);
    }
  } finally {
    // Clean up temp .npmrc
    if (npmrcPath) {
      rmSync(npmrcPath, {force: true});
    }
  }
})();
