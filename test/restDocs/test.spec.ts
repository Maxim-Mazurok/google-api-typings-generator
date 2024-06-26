import {readdirSync, readFileSync, rmSync} from 'node:fs';
import {join} from 'node:path';
import {App} from '../../src/app';
import {RestDescription} from '../../src/discovery';
import {App as DtApp} from '../../src/dt/app';
import {getPackageNameFromRestDescription} from '../../src/utils';

const readFileSyncAsUTF8 = (path: string) => readFileSync(path, 'utf-8');

let app: App;
let dtApp: DtApp;

beforeAll(() => {
  app = new App({
    typesDirectory: join(__dirname, 'results'),
    bannedTypes: [],
    owners: [
      'Maxim Mazurok <https://github.com/Maxim-Mazurok>',
      'Nick Amoscato <https://github.com/namoscato>',
      'Declan Vong <https://github.com/declanvong>',
    ],
  });

  dtApp = new DtApp({
    dtTypesDirectory: join(__dirname, 'results', 'dt'),
    owners: [
      {
        name: 'Maxim Mazurok',
        githubUsername: 'Maxim-Mazurok',
      },
      {
        name: 'Nick Amoscato',
        githubUsername: 'namoscato', // cspell:words namoscato
      },
      {
        name: 'Declan Vong',
        githubUsername: 'declanvong',
      },
    ],
  });
});

const mySnapshotTest = async (name: string, action: () => Promise<void>) => {
  const resultFolder = `${join(__dirname, 'results', name)}`;

  rmSync(resultFolder, {force: true, recursive: true});

  await action();

  readdirSync(resultFolder).forEach(file => {
    expect(readFileSyncAsUTF8(join(resultFolder, file))).toMatchSnapshot();
  });
};

['drive', 'sheets', 'calendar', 'admin', 'integrations'].forEach(apiName => {
  it(`${apiName} works`, async () => {
    const restDescription = JSON.parse(
      readFileSyncAsUTF8(join(__dirname, `${apiName}.json`))
    ) as RestDescription;
    const packageName = getPackageNameFromRestDescription(restDescription);

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
      readFileSyncAsUTF8(join(__dirname, `${apiName}.json`))
    ) as RestDescription;
    const packageName = getPackageNameFromRestDescription(restDescription);

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

  const folder = getPackageNameFromRestDescription(restDescription);

  await mySnapshotTest(folder, () =>
    app.processService(restDescription, new URL('http://x.com'), false)
  );
});
