import {Octokit} from '@octokit/rest';
import {
  appendFileSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import {tmpdir} from 'node:os';
import {basename, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  ensureDirectoryExists,
  getRevision,
  hasOwnProperty,
  rootFolder,
  sleep,
} from '../../src/utils.js';
import {generateTotp} from '../../src/npm-trusted-publishing.js';
import {GitHub, GitHubSettings} from './git-hub.js';
import {Settings} from './index.js';
import {SH} from './sh.js';

const NPM_REGISTRY_URL = 'https://registry.npmjs.org';

export const createOctokit = ({
  auth,
  user,
  thisRepo,
}: GitHubSettings): Octokit =>
  new Octokit({
    auth,
    userAgent: `${user}/${thisRepo}`,
    timeZone: 'UTC',
  });

export class Helpers {
  constructor(
    private readonly sh: SH,
    private readonly gitHub: GitHub,
    private readonly settings: Settings,
    private readonly npmrcPath?: string,
    private readonly npmTotpSecret?: string,
  ) {}

  private readonly getUserConfigFlag = (): string =>
    this.npmrcPath ? ` --userconfig ${this.npmrcPath}` : ''; // cspell:words userconfig

  private readonly npmPackageIsPublished = async (
    packageName: string,
  ): Promise<boolean> => {
    const response = await fetch(
      `${NPM_REGISTRY_URL}/${encodeURIComponent(packageName)}`,
    );

    if (response.ok) {
      return true;
    }
    if (response.status === 404) {
      return false;
    }

    throw new Error(
      `Failed to check whether ${packageName} is published (${response.status}): ${await response.text()}`,
    );
  };

  npmPublish = async (
    npmArchivePath: URL,
    retriesLeft = 5,
    retryTimeout = 60, // seconds
  ): Promise<void> => {
    retriesLeft--;
    const cmd = `npm publish --access public --provenance${this.getUserConfigFlag()} ${fileURLToPath(npmArchivePath)}`;
    const apiName = basename(fileURLToPath(npmArchivePath));
    const error503 = '503 Service Unavailable';
    const error404 = '404 Not Found';
    const error429 = '429 Too Many Requests';
    const errorIdTokenRead = 'IDENTITY_TOKEN_READ_ERROR'; // Seems like a transient error? https://github.com/Maxim-Mazurok/google-api-typings-generator/actions/runs/17128490304/job/48586056323
    try {
      await this.sh.runSh(cmd);
    } catch (exception) {
      if (exception instanceof Error === false) {
        console.error('Unknown exception type: ', {exception});
        throw exception;
      }
      if (
        !hasOwnProperty(exception, 'stderr') ||
        typeof exception.stderr !== 'string'
      ) {
        console.error('Non-SpawnResult exception type: ', {exception});
        throw exception;
      }
      const error = exception.stderr;
      if (
        error.includes(
          'You cannot publish over the previously published versions',
        )
      ) {
        console.warn(`Revision already published for ${apiName}, skipping...`);
      } else if (
        (error.includes(error503) ||
          error.includes(error404) ||
          error.includes(error429) ||
          error.includes(errorIdTokenRead)) &&
        retriesLeft > 0
      ) {
        console.warn(
          `NPM returned ${error} for ${apiName}, retrying in ${retryTimeout}s...`,
        );
        sleep(retryTimeout);
        await this.npmPublish(npmArchivePath, retriesLeft);
      } else {
        throw SH.error(exception);
      }
    }
  };

  ensureNpmPackagePublished = async (packageName: string): Promise<void> => {
    if (await this.npmPackageIsPublished(packageName)) {
      console.log(`${packageName} is already published`);
      return;
    }

    console.log(
      `${packageName} is not published yet; publishing initializer package...`,
    );
    await this.npmPublishInitializer(packageName);
  };

  npmPublishInitializer = async (packageName: string): Promise<void> => {
    if (!this.npmrcPath) {
      throw new Error(
        `Cannot publish initializer package for ${packageName}: npm credentials were not provided`,
      );
    }
    if (!this.npmTotpSecret) {
      throw new Error(
        `Cannot publish initializer package for ${packageName}: npm TOTP secret was not provided`,
      );
    }

    const packageDir = mkdtempSync(join(tmpdir(), 'npm-initializer-'));
    const packageJson = {
      name: packageName,
      version: '0.0.0',
      description:
        'Initializer package used to configure npm trusted publishing.',
      license: 'MIT',
      types: 'index.d.ts',
    };
    writeFileSync(
      join(packageDir, 'package.json'),
      `${JSON.stringify(packageJson, null, 2)}\n`,
    );
    writeFileSync(
      join(packageDir, 'README.md'),
      `# ${packageName}\n\nThis temporary initializer version exists so npm trusted publishing can be configured for this package.\n`,
    );
    writeFileSync(join(packageDir, 'index.d.ts'), 'export {};\n');
    appendFileSync(this.npmrcPath, `otp=${generateTotp(this.npmTotpSecret)}\n`);

    const cmd = `npm publish --access public${this.getUserConfigFlag()} ${packageDir}`;

    try {
      await this.sh.runSh(cmd);
    } catch (exception) {
      throw SH.error(exception);
    } finally {
      rmSync(packageDir, {recursive: true, force: true});
    }
  };

  downloadTypesBranch = async (): Promise<void> => {
    const {
      user,
      thisRepo,
      typesBranchName,
      typesDirName: typesDirName,
    } = this.settings;

    const commitSHA = await this.gitHub.getLatestCommitHash({
      owner: user,
      repo: thisRepo,
      branch: typesBranchName,
    });

    const url = await this.gitHub.getArchiveLink(commitSHA);
    ensureDirectoryExists(typesDirName);
    const cmd = `curl ${url} | tar xvz --strip-components=1 -C ${typesDirName}`; // TODO: rewrite this to NodeJS, using fetch and tar-stream, for example
    await this.sh.trySh(cmd);
  };

  getAllTypes = (): {name: string; revision: number}[] => {
    const {typesDirName: tempTypesDirName} = this.settings;

    const getDirectories = (source: URL) =>
      readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => {
          const packageShortName = dirent.name;
          const indexDTSPath = new URL(
            `${packageShortName}/index.d.ts`,
            source,
          );
          const revision = getRevision(indexDTSPath);
          if (revision === undefined) {
            throw new Error(`Could not get revision from ${indexDTSPath}`);
          }
          return {
            name: packageShortName,
            revision,
          };
        });

    return getDirectories(new URL(`${tempTypesDirName}/`, rootFolder));
  };
}
