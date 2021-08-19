import assert from 'assert';
import {readFileSync} from 'fs';
import path from 'path';

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
  assert.strictEqual(packageJson['engines']['node'], nvmrc.trimEnd());
});
