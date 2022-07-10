// cspell:word colordiff

import assert from 'node:assert';
import {execSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {App} from '../../src/app.js';
import {App as DtApp} from '../../src/dt/app.js';
import {RestDescription} from '../../src/discovery.js';
import {getPackageName} from '../../src/utils.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

let app: App;
let dtApp: DtApp;

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

  dtApp = new DtApp({
    dtTypesDirectory: join(__dirname, 'results', 'dt'),
    maxLineLength: 200,
    owners: [
      'Maxim Mazurok <https://github.com/Maxim-Mazurok>',
      'Nick Amoscato <https://github.com/namoscato>',
      'Declan Vong <https://github.com/declanvong>',
    ],
  });
});

const mySnapshotTest = async (name: string, action: () => Promise<void>) => {
  const snapshotFolder = `${join(__dirname, 'snapshots', name)}`;
  const resultFolder = `${join(__dirname, 'results', name)}`;

  execSync(`rm -rf ${resultFolder}`);

  await action();

  const colordiffBinPath = execSync('which colordiff || which diff'); // recommended `sudo apt install colordiff`
  const diffCommand = `${colordiffBinPath} ${snapshotFolder} ${resultFolder}`;

  if (process.argv.includes('--update')) {
    console.warn(`updating ${name} snapshot...`);
    execSync(
      `rm -rf ${snapshotFolder} && mkdir -p ${snapshotFolder} && cp -R ${resultFolder}/. ${snapshotFolder}`
    );
    console.warn(`${name} snapshot updated!`);
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
};

['drive', 'sheets', 'calendar', 'admin'].forEach(apiName => {
  it(`${apiName} works`, async () => {
    const restDescription = JSON.parse(
      readFileSync(join(__dirname, `${apiName}.json`), 'utf-8')
    ) as RestDescription;
    const packageName = getPackageName(restDescription);

    await mySnapshotTest(packageName, () =>
      app.processService(
        restDescription,
        new URL(`http://localhost:3000/${apiName}.json`),
        false
      )
    );
  });
});

['drive', 'sheets', 'calendar', 'admin'].forEach(apiName => {
  it(`${apiName} DT works`, async () => {
    const restDescription = JSON.parse(
      readFileSync(join(__dirname, `${apiName}.json`), 'utf-8')
    ) as RestDescription;
    const packageName = getPackageName(restDescription);

    await mySnapshotTest(join('dt', packageName), () =>
      dtApp.processService(restDescription)
    );
  });
});

it('uses method ID instead of resource name/key', async () => {
  // TODO: maybe merge with above? (reduce code duplication)
  const restDescription = {
    name: 'some-name',
    title: 'Some Name',
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

  const folder = getPackageName(restDescription);

  await mySnapshotTest(folder, () =>
    app.processService(restDescription, new URL('http://x.com'), false)
  );
});
