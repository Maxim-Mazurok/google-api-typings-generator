import {readdirSync, readFileSync, rmSync} from 'node:fs';
import {join} from 'node:path';
import {vi} from 'vitest';
import {App} from '../../src/app.js';
import {RestDescription} from '../../src/discovery.js';
import {App as DtApp} from '../../src/dt/app.js';
import {getPackageNameFromRestDescription} from '../../src/utils.js';

const readFileSyncAsUTF8 = (path: string) => readFileSync(path, 'utf-8');

let app: App;
let dtApp: DtApp;

beforeAll(() => {
  app = new App({
    typesDirectory: join(import.meta.dirname, 'results'),
    owners: [
      'Maxim Mazurok <https://github.com/Maxim-Mazurok>',
      'Nick Amoscato <https://github.com/namoscato>',
      'Declan Vong <https://github.com/declanvong>',
    ],
  });

  dtApp = new DtApp({
    dtTypesDirectory: join(import.meta.dirname, 'results', 'dt'),
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
  const resultFolder = `${join(import.meta.dirname, 'results', name)}`;

  rmSync(resultFolder, {force: true, recursive: true});

  await action();

  readdirSync(resultFolder).forEach(file => {
    expect(readFileSyncAsUTF8(join(resultFolder, file))).toMatchSnapshot();
  });
};

['drive', 'sheets', 'calendar', 'admin', 'integrations'].forEach(apiName => {
  it(`${apiName} works`, async () => {
    const restDescription = JSON.parse(
      readFileSyncAsUTF8(join(import.meta.dirname, `${apiName}.json`)),
    ) as RestDescription;
    const packageName = getPackageNameFromRestDescription(restDescription);

    await mySnapshotTest(packageName, () =>
      app.processService(
        restDescription,
        new URL(`http://localhost:3000/${apiName}.json`),
        false,
      ),
    );
  });
});

['drive', 'sheets', 'calendar', 'admin'].forEach(apiName => {
  it(`${apiName} DT works`, async () => {
    const restDescription = JSON.parse(
      readFileSyncAsUTF8(join(import.meta.dirname, `${apiName}.json`)),
    ) as RestDescription;
    const packageName = getPackageNameFromRestDescription(restDescription);

    await mySnapshotTest(join('dt', packageName), () =>
      dtApp.processService(restDescription),
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
    app.processService(restDescription, new URL('http://x.com'), false),
  );
});

it('warns when schema names shadow TypeScript globals', async () => {
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

  try {
    const restDescription = JSON.parse(
      readFileSyncAsUTF8(join(import.meta.dirname, 'calendar.json')),
    ) as RestDescription;

    const resultFolder = join(
      import.meta.dirname,
      'results',
      getPackageNameFromRestDescription(restDescription),
    );
    rmSync(resultFolder, {force: true, recursive: true});

    await app.processService(
      restDescription,
      new URL('http://localhost:3000/calendar.json'),
      false,
    );

    const warnings = warnSpy.mock.calls.map(call => call[0] as string);
    const shadowWarnings = warnings.filter(
      message => typeof message === 'string' && message.startsWith('WARNING:'),
    );

    // Calendar API has schemas named "Error" and "Event" which
    // shadow TypeScript global types
    expect(shadowWarnings).toContainEqual(
      expect.stringContaining('schema "Error"'),
    );
    expect(shadowWarnings).toContainEqual(
      expect.stringContaining('schema "Event"'),
    );
  } finally {
    warnSpy.mockRestore();
  }
});

it('handles reserved JS keyword resource names via declaration merging', async () => {
  const restDescription = {
    name: 'debugger-api',
    title: 'Debugger API',
    id: 'debugger-api:v1',
    version: 'v1',
    documentationLink: 'https://example.com',
    schemas: {},
    resources: {
      debugger: {
        methods: {
          list: {
            httpMethod: 'GET',
            path: 'debugger/list',
            id: 'debuggerApi.list',
          },
        },
        resources: {
          breakpoints: {
            methods: {
              get: {
                httpMethod: 'GET',
                path: 'debugger/breakpoints/get',
                id: 'debuggerApi.get',
              },
            },
          },
        },
      },
      controller: {
        methods: {
          update: {
            httpMethod: 'PUT',
            path: 'controller/update',
            id: 'debuggerApi.update',
          },
        },
      },
    },
  } as RestDescription;

  const folder = getPackageNameFromRestDescription(restDescription);

  await mySnapshotTest(folder, () =>
    app.processService(restDescription, new URL('http://x.com'), false),
  );
});

it('classifies empty schemas by REST usage', async () => {
  const restDescription = {
    name: 'empty-schema-api',
    title: 'Empty Schema API',
    id: 'empty-schema-api:v1',
    version: 'v1',
    documentationLink: 'https://example.com',
    schemas: {
      EmptyRequest: {
        id: 'EmptyRequest',
        type: 'object',
        properties: {},
      },
      EmptyResponse: {
        id: 'EmptyResponse',
        type: 'object',
        properties: {},
      },
      DictionaryResponse: {
        id: 'DictionaryResponse',
        type: 'object',
        additionalProperties: {type: 'string'},
      },
      UnclassifiedEmpty: {
        id: 'UnclassifiedEmpty',
        type: 'object',
        properties: {},
      },
      Container: {
        id: 'Container',
        type: 'object',
        properties: {
          metadata: {$ref: 'UnclassifiedEmpty'},
          inlineMetadata: {type: 'object', properties: {}},
        },
      },
    },
    resources: {
      records: {
        methods: {
          create: {
            httpMethod: 'POST',
            path: 'records',
            id: 'emptySchemaApi.records.create',
            request: {$ref: 'EmptyRequest'},
            response: {$ref: 'EmptyResponse'},
          },
          delete: {
            httpMethod: 'DELETE',
            path: 'records',
            id: 'emptySchemaApi.records.delete',
            response: {$ref: 'EmptyResponse'},
          },
          listLabels: {
            httpMethod: 'GET',
            path: 'records/labels',
            id: 'emptySchemaApi.records.listLabels',
            response: {$ref: 'DictionaryResponse'},
          },
        },
      },
    },
  } as RestDescription;
  const resultFolder = join(
    import.meta.dirname,
    'results',
    getPackageNameFromRestDescription(restDescription),
  );
  rmSync(resultFolder, {force: true, recursive: true});

  await app.processService(restDescription, new URL('http://x.com'), false);

  const generatedTypes = readFileSyncAsUTF8(join(resultFolder, 'index.d.ts'));
  expect(generatedTypes).toContain(
    'interface EmptyRequest {\n            [key: string]:\n                never;',
  );
  expect(generatedTypes).toContain(
    'interface EmptyResponse {\n            [key: string]:\n                never;',
  );
  expect(generatedTypes).toContain(
    'interface UnclassifiedEmpty {\n            [key: string]:\n                unknown;',
  );
  expect(generatedTypes).toContain(
    'metadata?:\n                UnclassifiedEmpty;',
  );
  expect(generatedTypes).toContain(
    'inlineMetadata?:\n                { [key: string]: unknown };',
  );
  expect(generatedTypes).toContain('): Request<{ [key: string]: never }>;');
  expect(generatedTypes).toContain('): Request<DictionaryResponse>;');
  expect(generatedTypes).not.toContain('Request<{}>');
});
