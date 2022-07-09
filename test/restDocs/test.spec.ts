// cspell:word colordiff

import assert from 'node:assert';
import {execSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {App} from '../../src/app.js';
import {RestDescription} from '../../src/discovery.js';
import {getPackageName} from '../../src/utils.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

let app: App;

before(() => {
  app = new App({
    typesDirectory: join(__dirname, 'results'),
    maxLineLength: 200,
    bannedTypes: [],
    owners: [
      'Maxim Mazurok <https://github.com/Maxim-Mazurok>',
      'Nick Amoscato <https://github.com/namoscato>',
      'Declan Vong <https://github.com/declanvong>',
    ],
  });
});

['drive', 'sheets', 'calendar', 'admin'].forEach(apiName => {
  it(`${apiName} works`, async () => {
    const restDescription = JSON.parse(
      readFileSync(join(__dirname, `${apiName}.json`), 'utf-8')
    ) as RestDescription;
    const packageName = getPackageName(restDescription);
    const snapshotFolder = `${join(__dirname, 'snapshots', packageName)}`;
    const resultFolder = `${join(__dirname, 'results', packageName)}`;

    execSync(`rm -rf ${resultFolder}`);

    await app.processService(
      restDescription,
      new URL(`http://localhost:3000/${apiName}.json`),
      false
    );

    const diffCommand = `colordiff ${snapshotFolder} ${resultFolder}`; // need `sudo apt install colordiff`

    if (process.argv.includes('--update')) {
      console.warn(`updating ${apiName} snapshot...`);
      execSync(
        `rm -rf ${snapshotFolder} && cp -R ${resultFolder} ${snapshotFolder}`
      );
      console.warn(`${apiName} snapshot updated!`);
    } else {
      try {
        execSync(diffCommand);
      } catch (e) {
        // exit code 1 when there's some diff
        const diff = execSync(`${diffCommand} || print`, {
          encoding: 'utf-8',
        });
        console.log(diff);
        assert.fail('should be no diff between actual and snapshot');
      }
    }
  });
});

it('uses method ID instead of resource name/key', async () => {
  // TODO: merge with above (reduce code duplication)
  const restDescription = {
    name: 'some-name',
    id: 'some-name:v1',
    version: 'v1',
    documentationLink: 'bla',
    schemas: {},
    resources: {
      firstResource: {
        methods: {
          firstMethod: {
            httpMethod: 'GET',
            path: 'some/path/1',
            id: 'thirdNamespace.firstMethod',
          },
        },
      },
    },
  } as RestDescription;

  await app.processService(restDescription, new URL('http://x.com'), false);

  const folder = getPackageName(restDescription);
  const snapshotFolder = `${join(__dirname, 'snapshots', folder)}`;
  const resultFolder = `${join(__dirname, 'results', folder)}`;
  const diffCommand = `colordiff ${snapshotFolder} ${resultFolder}`; // need `sudo apt install colordiff`

  if (process.argv.includes('--update')) {
    console.warn(`updating ${restDescription.id} snapshot...`);
    execSync(
      `rm -rf ${snapshotFolder} && cp -R ${resultFolder} ${snapshotFolder}`
    );
    console.warn(`${restDescription.id} snapshot updated!`);
  } else {
    try {
      execSync(diffCommand);
    } catch (e) {
      // exit code 1 when there's some diff
      const diff = execSync(`${diffCommand} || print`, {
        encoding: 'utf-8',
      });
      console.log(diff);
      assert.fail('should be no diff between actual and snapshot');
    }
  }
});
