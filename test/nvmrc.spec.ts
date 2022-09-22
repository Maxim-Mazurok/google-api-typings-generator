import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
