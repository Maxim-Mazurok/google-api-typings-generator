import {z} from 'zod';

const getResultOrError = <T>(
  promise: Promise<T>,
): Promise<
  | {result: T; isError: false; error: undefined}
  | {result: undefined; isError: true; error: unknown}
> => {
  return promise
    .then(result => ({result, isError: false as const, error: undefined}))
    .catch(error => ({result: undefined, isError: true as const, error}));
};

const getLatestVersionOr404 = async (
  packageName: string,
): Promise<
  | {latestVersion: string; packageNotFound: undefined}
  | {packageNotFound: true; latestVersion: undefined}
> => {
  const {
    result: latestVersion,
    isError,
    error,
  } = await getResultOrError(getLatestVersion(packageName));

  if (isError) {
    const PackageNotFoundErrorSchema = z.object({
      name: z.literal('PackageNotFoundError'),
    });
    if (PackageNotFoundErrorSchema.safeParse(error).success) {
      return {packageNotFound: true, latestVersion: undefined};
    }
    throw error;
  }
  return {latestVersion, packageNotFound: undefined};
};

const getLatestVersionInfo = async (
  packageName: string,
  localRevision: number,
) => {
  const {latestVersion, packageNotFound} =
    await getLatestVersionOr404(packageName);

  if (packageNotFound) {
    return {
      isNewPackage: true,
      latestVersion: null,
      revision: null,
      localIsNewer: false,
      localIsOlder: false,
    } as const;
  }

  const revision = getRevision(latestVersion);
  return {
    isNewPackage: false as const,
    latestVersion,
    revision,
    localIsNewer: revision > localRevision,
    localIsOlder: revision < localRevision,
  };
};

const getRevision = (version: string): number => {};
const getLocalRevision = (): number => {};
const createLocalTgz = (): Buffer => {};
const fetchNpmTgz = (version: string): Buffer => {};
const hashTgz = (tgz: Buffer): string => {};
const getLatestVersion: (
  packageName: string,
) => Promise<string> = async packageName => {
  // Simulate fetching the latest version from a registry
  return '1.0.0';
};

export const getTgzToPublish = async (packageName: string) => {
  const localRevision = getLocalRevision();
  const {isNewPackage, latestVersion, localIsNewer, localIsOlder} =
    await getLatestVersionInfo(packageName, localRevision);

  if (localIsOlder) {
    return null;
  }

  const localTgz = createLocalTgz();

  if (isNewPackage || localIsNewer) {
    return localTgz;
  }

  const npmTgz = fetchNpmTgz(latestVersion);

  if (hashTgz(npmTgz) === hashTgz(localTgz)) {
    return null;
  }

  return localTgz;
};
