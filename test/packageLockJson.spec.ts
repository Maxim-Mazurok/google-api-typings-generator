import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packageLockJson = readFileSync(
  path.resolve(path.join(__dirname, '..', 'package-lock.json')),
  'utf-8'
);

const packageJson = JSON.parse(
  readFileSync(
    path.resolve(path.join(__dirname, '..', 'package.json')),
    'utf-8'
  )
);

describe('versions match in package and package-lock.json', () => {
  it('node', () => {
    expect(packageJson['engines']['node']).toBe(
      JSON.parse(packageLockJson)['packages']['']['engines']['node']
    );
  });

  it('npm', () => {
    expect(packageJson['engines']['npm']).toBe(
      JSON.parse(packageLockJson)['packages']['']['engines']['npm']
    );
  });
});
