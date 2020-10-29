/* copied from https://github.com/palantir/tslint/blob/master/src/rules/interfaceNameRule.ts */

export function hasPrefixI(name: string): boolean {
  return name.length >= 3 && name[0] === 'I' && /^[A-Z]*$/.test(name[1]);
}

export function cantDecide(name: string): boolean {
  return (
    // Case ID
    (name.length === 2 && name[0] === 'I' && /^[A-Z]*$/.test(name[1])) ||
    // Case IDB or ID42
    (name.length >= 2 &&
      name[0] === 'I' &&
      /^[A-Z]*$/.test(name[1]) &&
      !/^[a-z]*$/.test(name[2]))
  );
}
