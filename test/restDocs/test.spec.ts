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

it('generates overload with body fields spread as top-level properties', async () => {
  const restDescription = {
    name: 'body-fields-api',
    title: 'Body Fields API',
    id: 'body-fields-api:v1',
    version: 'v1',
    documentationLink: 'https://example.com',
    schemas: {
      MyRequest: {
        id: 'MyRequest',
        type: 'object',
        properties: {
          title: {type: 'string', description: 'The title'},
          count: {type: 'integer', description: 'The count'},
          items: {
            type: 'array',
            items: {type: 'string'},
            description: 'The items list',
          },
        },
      },
      MyResponse: {
        id: 'MyResponse',
        type: 'object',
        properties: {
          result: {type: 'string'},
        },
      },
    },
    resources: {
      things: {
        methods: {
          create: {
            httpMethod: 'POST',
            path: 'things',
            id: 'bodyFieldsApi.things.create',
            parameters: {
              projectId: {
                type: 'string',
                required: true,
                description: 'The project ID',
              },
            },
            request: {$ref: 'MyRequest'},
            response: {$ref: 'MyResponse'},
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

it('excludes conflicting body fields from top-level properties', async () => {
  const restDescription = {
    name: 'conflict-api',
    title: 'Conflict API',
    id: 'conflict-api:v1',
    version: 'v1',
    documentationLink: 'https://example.com',
    parameters: {
      fields: {
        type: 'string',
        description: 'Global fields param',
      },
    },
    schemas: {
      UpdateRequest: {
        id: 'UpdateRequest',
        type: 'object',
        properties: {
          fields: {
            type: 'string',
            description: 'Body fields property (conflicts with global param)',
          },
          name: {
            type: 'string',
            description: 'Body name property (conflicts with method param)',
          },
          description: {type: 'string', description: 'Body description'},
          tags: {
            type: 'array',
            items: {type: 'string'},
            description: 'Body tags',
          },
        },
      },
      UpdateResponse: {
        id: 'UpdateResponse',
        type: 'object',
        properties: {
          ok: {type: 'boolean'},
        },
      },
    },
    resources: {
      items: {
        methods: {
          update: {
            httpMethod: 'PUT',
            path: 'items/{name}',
            id: 'conflictApi.items.update',
            parameters: {
              name: {
                type: 'string',
                required: true,
                description: 'The item name',
              },
            },
            request: {$ref: 'UpdateRequest'},
            response: {$ref: 'UpdateResponse'},
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

it('does not generate body fields overload for empty body schema', async () => {
  const restDescription = {
    name: 'empty-body-api',
    title: 'Empty Body API',
    id: 'empty-body-api:v1',
    version: 'v1',
    documentationLink: 'https://example.com',
    schemas: {
      EmptyRequest: {
        id: 'EmptyRequest',
        type: 'object',
        properties: {},
      },
      SomeResponse: {
        id: 'SomeResponse',
        type: 'object',
        properties: {
          status: {type: 'string'},
        },
      },
    },
    resources: {
      actions: {
        methods: {
          trigger: {
            httpMethod: 'POST',
            path: 'actions/trigger',
            id: 'emptyBodyApi.actions.trigger',
            request: {$ref: 'EmptyRequest'},
            response: {$ref: 'SomeResponse'},
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
