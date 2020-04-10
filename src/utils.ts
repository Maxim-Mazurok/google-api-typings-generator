import fs from 'fs';

/**
 * Converts the specified version into a `major.minor` convention.
 *
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped#how-do-definitely-typed-package-versions-relate-to-versions-of-the-corresponding-library
 */
export function parseVersion(version: string) {
  const matches = version.match(/v(\d+)?\.?(\d+)?/);

  return matches ? `${matches[1] || 0}.${matches[2] || 0}` : '0.0';
}

/**
 * Returns the capitalized name of the TypeScript interface for the specified resource.
 */
export function getResourceTypeName(resourceName: string) {
  resourceName = resourceName
    .split('-')
    .map(x => `${x[0].toUpperCase()}${x.substring(1)}`)
    .join('');

  return `${resourceName[0].toUpperCase()}${resourceName.substring(1)}Resource`;
}

/**
 * Creates directory recursively if it doesn't exist
 * @param directory
 */
export const ensureDirectoryExists = (directory: string) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {recursive: true});
  }
};
