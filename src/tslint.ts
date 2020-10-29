/* copied from https://github.com/palantir/tslint/blob/5.14.0/src/rules/interfaceNameRule.ts */
/* version 5.14.0 because that's what's used in dtslint currently */

function isUpperCase(str: string): boolean {
  return str === str.toUpperCase();
}

export function hasPrefixI(name: string): boolean {
  // Allow IndexedDB interfaces
  return (
    name.length >= 2 &&
    name[0] === 'I' &&
    isUpperCase(name[1]) &&
    !name.startsWith('IDB')
  );
}
