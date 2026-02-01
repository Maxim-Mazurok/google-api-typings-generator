import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import packageJson from 'package-json';
import semver, {SemVer} from 'semver';
import {z} from 'zod';
import {SH} from '../bin/auto-publish/sh.js';
import {getFullPackageName, rootFolder} from './utils.js';

const getResultOrError = async <T>(
  promise: Promise<T>,
): Promise<
  | {result: T; isError: false; error: undefined}
  | {result: undefined; isError: true; error: unknown}
> => {
  try {
    const result = await promise;
    return {result, isError: false as const, error: undefined};
  } catch (error) {
    return {result: undefined, isError: true as const, error};
  }
};

const getLatestMetaOr404 = async (
  fullPackageName: string, // e.g. `@maxim_mazurok/gapi.client.oauth2-v2`, not `gapi.client.oauth2-v2`
): Promise<
  | {latestVersion: string; shasum: string; packageNotFound: undefined}
  | {packageNotFound: true; latestVersion: undefined; shasum: undefined}
> => {
  const {
    result: meta,
    isError,
    error,
  } = await getResultOrError(
    packageJson(fullPackageName), // NOTE: it doesn't support proxy, but proxy support is primarily for generating types on corporate networks, while publishing is done on GitHub Actions, so it's irrelevant and ok
  );

  if (isError) {
    const PackageNotFoundErrorSchema = z.object({
      name: z.literal('PackageNotFoundError'),
    });
    if (PackageNotFoundErrorSchema.safeParse(error).success) {
      return {
        packageNotFound: true,
        latestVersion: undefined,
        shasum: undefined,
      };
    }
    throw error;
  }
  return {
    latestVersion: meta.version,
    shasum: meta.dist.shasum,
    packageNotFound: undefined,
  };
};

export const getLatestVersionInfo = async (
  fullPackageName: string, // e.g. `@maxim_mazurok/gapi.client.oauth2-v2`, not `gapi.client.oauth2-v2`
  localRevision: number,
): Promise<
  | {
      isNewPackage: true;
      localRevisionIsNewer: false;
      localRevisionIsOlder: false;
      latestVersion: undefined;
      shasum: undefined;
    }
  | {
      isNewPackage: false;
      localRevisionIsNewer: boolean;
      localRevisionIsOlder: boolean;
      latestVersion: string;
      shasum: string;
    }
> => {
  const {latestVersion, packageNotFound, shasum} =
    await getLatestMetaOr404(fullPackageName);

  if (packageNotFound) {
    return {
      isNewPackage: true,
      localRevisionIsNewer: false,
      localRevisionIsOlder: false,
      latestVersion,
      shasum,
    } as const;
  }

  const revision = getFromSemVer(latestVersion, 'revision');
  return {
    isNewPackage: false as const,
    localRevisionIsNewer: revision < localRevision,
    localRevisionIsOlder: revision > localRevision,
    latestVersion,
    shasum,
  };
};

const INTERNAL_TO_SEMVER = {
  revision: 'patch',
  generatorVersion: 'minor',
} as const;

const getFromSemVer = (
  version: string,
  type: keyof typeof INTERNAL_TO_SEMVER,
): number => {
  const semVerType = INTERNAL_TO_SEMVER[type];
  return semver[semVerType](version);
};

export class NpmArchivesToPublishHelper {
  private readonly sh: SH;
  private readonly settings: {typesDirName: string};

  constructor(sh: SH, settings: {typesDirName: string}) {
    this.sh = sh;
    this.settings = settings;
  }

  private getPackageDirPath = (
    shortPackageName: string, // e.g. `gapi.client.oauth2-v2`, not `@maxim_mazurok/gapi.client.oauth2-v2`
  ): URL => {
    const typesDirPath = new URL(`${this.settings.typesDirName}/`, rootFolder);
    return new URL(`${shortPackageName}/`, typesDirPath);
  };

  private setPackageGeneratorVersion = async (
    shortPackageName: string, // e.g. `gapi.client.oauth2-v2`, not `@maxim_mazurok/gapi.client.oauth2-v2`
    newGeneratorVersion: number,
  ): Promise<void> => {
    // Using regex because I want to preserve exact formatting of the file, don't want to worry about it
    const packageDirPath = this.getPackageDirPath(shortPackageName);
    const packageJsonPath = new URL('package.json', packageDirPath);
    const packageJsonText = await readFile(packageJsonPath, 'utf8');
    const versionRegex = /("version":\s*")(\d+\.\d+\.\d+)(")/;
    const patchedPackageJsonText = packageJsonText.replace(
      versionRegex,
      (_, prefix, currentSemVer, suffix) => {
        const currentSemVerObject = new SemVer(currentSemVer);
        currentSemVerObject[INTERNAL_TO_SEMVER.generatorVersion] =
          newGeneratorVersion;
        return `${prefix}${currentSemVerObject.format()}${suffix}`; // important: use .format() instead of .version, because .version isn't updated when we mutate currentSemVerObject
      },
    );
    if (patchedPackageJsonText === packageJsonText) {
      console.warn(
        `Failed to patch package.json for ${shortPackageName}, no changes made. Version was: ${packageJsonText.match(versionRegex)?.[2]}, Generator version was: ${newGeneratorVersion}`,
      );
    }
    await writeFile(packageJsonPath, patchedPackageJsonText, 'utf8');
  };

  private createLocalNpmArchiveWithSHA = async (
    shortPackageName: string, // e.g. `gapi.client.oauth2-v2`, not `@maxim_mazurok/gapi.client.oauth2-v2`
  ): Promise<{
    archivePath: URL;
    shasum: string;
  }> => {
    // `npm pack --dry-run` was just ~2% faster over 1000 runs: dry-run: 213 ms; normal pack: 217 ms
    const packageDirPath = this.getPackageDirPath(shortPackageName);
    const command = `npm pack --json ${fileURLToPath(packageDirPath)} --pack-destination ${fileURLToPath(packageDirPath)}`;
    const {stdout} = await this.sh.trySh(command);
    const npmPackSchema = z
      .array(
        z.object({
          filename: z.string().nonempty(),
          shasum: z.string().length(40),
        }),
      )
      .length(1);

    const parsed = npmPackSchema.parse(JSON.parse(stdout));
    const {filename, shasum} = parsed[0];
    return {archivePath: new URL(filename, packageDirPath), shasum};
  };

  getNpmArchivePathToPublish = async (
    shortPackageName: string, // e.g. `gapi.client.oauth2-v2`, not `@maxim_mazurok/gapi.client.oauth2-v2`
    localRevision: number,
  ): Promise<URL | null> => {
    const fullPackageName = getFullPackageName(shortPackageName);
    const {
      isNewPackage,
      localRevisionIsNewer,
      localRevisionIsOlder,
      latestVersion,
      shasum: publishedNpmArchiveSHA,
    } = await getLatestVersionInfo(fullPackageName, localRevision);

    if (localRevisionIsOlder) {
      // always ignore older revisions
      return null;
    }

    if (isNewPackage) {
      // the package has never been published before, we need to publish it and can keep default generator (minor) version - 0
      const {archivePath} =
        await this.createLocalNpmArchiveWithSHA(shortPackageName);
      return archivePath;
    }

    // the package has been published before, we need to use generator version (minor) from the latest published version
    const generatorVersion = getFromSemVer(latestVersion, 'generatorVersion');
    await this.setPackageGeneratorVersion(shortPackageName, generatorVersion);
    const {archivePath: localNpmArchivePath, shasum: localNpmArchiveSHA} =
      await this.createLocalNpmArchiveWithSHA(shortPackageName);

    if (localRevisionIsNewer) {
      // the local revision is newer than the published one, we need to publish it, and no need to bump the generator version
      return localNpmArchivePath;
    }

    if (localNpmArchiveSHA === publishedNpmArchiveSHA) {
      // we already published this revision with this generator version, no files changed, no need to publish again
      return null;
    }

    // the revision is the same, but the generator changed, we need to bump the generator version to publish the update
    await this.setPackageGeneratorVersion(
      shortPackageName,
      generatorVersion + 1,
    );
    return (await this.createLocalNpmArchiveWithSHA(shortPackageName))
      .archivePath;
  };
}
