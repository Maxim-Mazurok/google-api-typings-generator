import fs from 'fs';
import path from 'path';

export const TYPE_PREFIX = 'gapi.client.';

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
 */
export function ensureDirectoryExists(directory: string) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {recursive: true});
  }
}

/**
 * Returns the filesystem directory for the specified service.
 */
export function getTypeDirectory(api: string, version: string | null) {
  const name = `${TYPE_PREFIX}${api}`;

  return null === version ? name : path.join(name, version);
}
