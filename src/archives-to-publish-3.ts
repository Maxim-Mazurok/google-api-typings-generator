const getLatestVersionInfo = (localRevision: number) => {
  try {
    const latestVersion = getLatestVersion();
    const revision = getRevision(latestVersion);
    return {
      isNewPackage: false as const,
      latestVersion,
      revision,
      localIsNewer: revision > localRevision,
      localIsOlder: revision < localRevision,
    };
  } catch (error) {
    if (error === 404) {
      return {
        isNewPackage: true,
        latestVersion: null,
        revision: null,
        localIsNewer: false,
        localIsOlder: false,
      } as const;
    }
    throw error;
  }
};

const getRevision = (version: string): number => {};
const getLocalRevision = (): number => {};
const createLocalTgz = (): Buffer => {};
const fetchNpmTgz = (version: string): Buffer => {};
const hashTgz = (tgz: Buffer): string => {};
const getLatestVersion = (): string => {};

const getTgzToPublish = () => {
  const localRevision = getLocalRevision();
  const {isNewPackage, latestVersion, localIsNewer, localIsOlder} =
    getLatestVersionInfo(localRevision);

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
