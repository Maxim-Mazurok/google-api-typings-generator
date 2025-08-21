import {readFileSync} from 'node:fs';
import path from 'node:path';

const nvmrc = readFileSync(
  path.resolve(path.join(import.meta.dirname, '..', '.nvmrc')),
  'utf-8',
);
const nodeVersion = readFileSync(
  path.resolve(path.join(import.meta.dirname, '..', '.node-version')),
  'utf-8',
);
const packageJson = JSON.parse(
  readFileSync(
    path.resolve(path.join(import.meta.dirname, '..', 'package.json')),
    'utf-8',
  ),
);

it('node versions match in package.json engines section and .nvmrc file', () => {
  expect(packageJson['engines']['node']).toBe(nvmrc.trimEnd());
});

it('node versions match in package.json engines section and .node-version file', () => {
  expect(packageJson['engines']['node']).toBe(nodeVersion.trimEnd());
});

it('.nvmrc and .node-version files contain the same version', () => {
  expect(nvmrc.trimEnd()).toBe(nodeVersion.trimEnd());
});
