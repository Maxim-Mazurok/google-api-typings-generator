import {rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {basename, dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {NpmArchivesToPublishHelper} from '../../src/archives-to-publish.js';
import {
  ensureTrustedPublishing,
  generateTotp,
  npmApiLogin,
} from '../../src/npm-trusted-publishing.js';
import {
  getFullPackageName,
  getNpmArchivesToPublish,
  sleep,
} from '../../src/utils.js';
import {GitHub, GitHubSettings} from './git-hub.js';
import {Helpers} from './helpers.js';
import {SH} from './sh.js';

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
const npmArchivesToPublishHelper = new NpmArchivesToPublishHelper(sh, settings);

process.on('unhandledRejection', reason => {
  throw reason;
});

void (async () => {
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

  // Login to npm to get a classic token for trust API calls (if credentials are available)
  const npmUsername = process.env.NPM_USERNAME;
  const npmPassword = process.env.NPM_PASSWORD;
  const npmTotpSecret = process.env.NPM_TOTP_SECRET;
  const hasNpmCredentials = npmUsername && npmPassword && npmTotpSecret;

  let npmToken: string | undefined;
  let npmrcPath: string | undefined;
  if (hasNpmCredentials && npmArchivesToPublish.length > 0) {
    const loginOtp = generateTotp(npmTotpSecret);
    npmToken = await npmApiLogin(npmUsername, npmPassword, loginOtp);
    npmrcPath = join(tmpdir(), `.npmrc-auto-publish-${Date.now()}`); // cspell:words npmrc
    writeFileSync(npmrcPath, `//registry.npmjs.org/:_authToken=${npmToken}\n`, {
      mode: 0o600,
    });
  }

  const publishHelpers = new Helpers(sh, gitHub, settings, npmrcPath);
  const repository = `${settings.user}/${settings.thisRepo}`;
  const workflowFile = 'auto-publish.yml';

  try {
    for (const npmArchivePath of npmArchivesToPublish) {
      const shortPackageName = basename(dirname(fileURLToPath(npmArchivePath)));
      const fullPackageName = getFullPackageName(shortPackageName);

      // Ensure trusted publishing is configured before publishing
      if (npmToken && npmTotpSecret) {
        await publishHelpers.ensureNpmPackagePublished(fullPackageName);
        sleep(3);
        await ensureTrustedPublishing(
          fullPackageName,
          repository,
          workflowFile,
          npmToken,
          npmTotpSecret,
        );
      }

      console.log(`Publishing ${npmArchivePath}...`);
      await helpers.npmPublish(npmArchivePath);
    }
  } finally {
    if (npmrcPath) {
      rmSync(npmrcPath, {force: true});
    }
  }
})();
