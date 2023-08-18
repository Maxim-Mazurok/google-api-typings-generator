import {readFileSync} from 'node:fs';
import path from 'node:path';

const nvmrc = readFileSync(
  path.resolve(path.join(__dirname, '..', '.nvmrc')),
  'utf-8'
);
const packageJson = JSON.parse(
  readFileSync(
    path.resolve(path.join(__dirname, '..', 'package.json')),
    'utf-8'
  )
);

it('node versions match in package.json engines section and .nvmrc file', () => {
  expect(packageJson['engines']['node']).toBe(nvmrc.trimEnd());
});
