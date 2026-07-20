import {existsSync, readdirSync, readFileSync, rmSync} from 'node:fs';
import {join} from 'node:path';
import {vi} from 'vitest';
import {App} from '../../src/app.js';
import * as discovery from '../../src/discovery.js';
import {RestDescription} from '../../src/discovery.js';
import {App as DtApp} from '../../src/dt/app.js';
import {
  DEFAULT_DIAGNOSTICS_DIRECTORY,
  getPackageNameFromRestDescription,
} from '../../src/utils.js';

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

describe('discover best-effort', () => {
  let testApp: App;
  let githubStepSummary: string | undefined;
  const testTypesDir = join(import.meta.dirname, 'results', 'best-effort-test');
  const diagnosticsDir = join(
    import.meta.dirname,
    'results',
    'best-effort-diagnostics',
  );
  const defaultDiagnosticsPackageDir = join(
    DEFAULT_DIAGNOSTICS_DIRECTORY,
    'generation-failures',
    'gapi.client.broken-api-v1',
  );

  beforeEach(() => {
    githubStepSummary = process.env.GITHUB_STEP_SUMMARY;
    delete process.env.GITHUB_STEP_SUMMARY;
    rmSync(testTypesDir, {force: true, recursive: true});
    rmSync(diagnosticsDir, {force: true, recursive: true});
    rmSync(defaultDiagnosticsPackageDir, {force: true, recursive: true});
    testApp = new App({
      typesDirectory: testTypesDir,
      diagnosticsDirectory: diagnosticsDir,
      owners: ['Test Owner <https://github.com/test>'],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (githubStepSummary === undefined) {
      delete process.env.GITHUB_STEP_SUMMARY;
    } else {
      process.env.GITHUB_STEP_SUMMARY = githubStepSummary;
    }
    rmSync(defaultDiagnosticsPackageDir, {force: true, recursive: true});
  });

  it('keeps explicit service runs strict when the requested service fails', async () => {
    const goodDescription = JSON.parse(
      readFileSyncAsUTF8(join(import.meta.dirname, 'drive.json')),
    ) as RestDescription;
    const badDescription = {
      name: 'bad-api',
      title: 'Bad API',
      id: 'bad-api:v1',
      version: 'v1',
      // missing documentationLink will cause processService to throw
      schemas: {},
      resources: {},
    } as RestDescription;

    vi.spyOn(discovery, 'getRestDescriptionsForService').mockResolvedValue([
      {
        restDescription: badDescription,
        restDescriptionSource: new URL('http://localhost/bad.json'),
      },
      {
        restDescription: goodDescription,
        restDescriptionSource: new URL('http://localhost/drive.json'),
      },
    ]);

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(testApp.discover('test-service')).rejects.toThrow(
      'Error processing service: bad-api',
    );

    const goodPackageName = getPackageNameFromRestDescription(goodDescription);
    expect(existsSync(join(testTypesDir, goodPackageName))).toBe(false);
    expect(errorSpy).toHaveBeenCalled();
  });

  it('continues generating other types in best-effort discovery mode', async () => {
    const goodDescription = JSON.parse(
      readFileSyncAsUTF8(join(import.meta.dirname, 'calendar.json')),
    ) as RestDescription;
    const badDescription = {
      name: 'broken-api',
      title: 'Broken API',
      id: 'broken-api:v1',
      version: 'v1',
      // missing documentationLink will cause processService to throw
      schemas: {},
      resources: {},
    } as RestDescription;

    vi.spyOn(discovery, 'getAllDiscoveryItems').mockResolvedValue([
      {
        id: 'broken-api:v1',
        name: 'broken-api',
        discoveryRestUrl: 'http://localhost/broken.json',
      },
      {
        id: 'calendar:v3',
        name: 'calendar',
        discoveryRestUrl: 'http://localhost/calendar.json',
      },
    ]);

    vi.spyOn(discovery, 'getRestDescriptionIfPossible').mockImplementation(
      (url: URL) => {
        if (url.toString().includes('broken')) {
          return Promise.resolve(badDescription);
        }

        return Promise.resolve(goodDescription);
      },
    );

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await testApp.discover(undefined, false, true);

    const goodPackageName = getPackageNameFromRestDescription(goodDescription);
    const goodDir = join(testTypesDir, goodPackageName);
    expect(readdirSync(goodDir).length).toBeGreaterThan(0);
    expect(
      existsSync(
        join(
          diagnosticsDir,
          'generation-failures',
          'gapi.client.broken-api-v1',
          'error.txt',
        ),
      ),
    ).toBe(true);

    // Summary should list the broken service
    const errorCalls = errorSpy.mock.calls.map(c => c[0] as string);
    expect(errorCalls).toContainEqual(expect.stringContaining('1 FAILURE(S)'));
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('| `gapi.client.broken-api-v1` | generation |'),
    );
  });

  it('fails best-effort discovery mode when every service fails', async () => {
    const badDescription = {
      name: 'broken-api',
      title: 'Broken API',
      id: 'broken-api:v1',
      version: 'v1',
      schemas: {},
      resources: {},
    } as RestDescription;

    vi.spyOn(discovery, 'getAllDiscoveryItems').mockResolvedValue([
      {
        id: 'broken-api:v1',
        name: 'broken-api',
        discoveryRestUrl: 'http://localhost/broken.json',
      },
    ]);

    vi.spyOn(discovery, 'getRestDescriptionIfPossible').mockResolvedValue(
      badDescription,
    );
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    await expect(testApp.discover(undefined, false, true)).rejects.toThrow(
      'Failed to process all 1 service(s)',
    );
    expect(readdirSync(testTypesDir).length).toBe(0);
  });

  it('fails best-effort discovery mode when every service is skipped', async () => {
    vi.spyOn(discovery, 'getAllDiscoveryItems').mockResolvedValue([
      {
        id: 'missing-api:v1',
        name: 'missing-api',
        discoveryRestUrl: 'http://localhost/missing.json',
      },
    ]);
    vi.spyOn(discovery, 'getRestDescriptionIfPossible').mockResolvedValue();

    await expect(testApp.discover(undefined, false, true)).rejects.toThrow(
      'Failed to process any services',
    );
  });

  it('writes local diagnostics to the OS temp directory by default', async () => {
    const localApp = new App({
      typesDirectory: testTypesDir,
      owners: ['Test Owner <https://github.com/test>'],
    });
    const badDescription = {
      name: 'broken-api',
      title: 'Broken API',
      id: 'broken-api:v1',
      version: 'v1',
      schemas: {},
      resources: {},
    } as RestDescription;

    vi.spyOn(discovery, 'getAllDiscoveryItems').mockResolvedValue([
      {
        id: 'broken-api:v1',
        name: 'broken-api',
        discoveryRestUrl: 'http://localhost/broken.json',
      },
      {
        id: 'calendar:v3',
        name: 'calendar',
        discoveryRestUrl: 'http://localhost/calendar.json',
      },
    ]);

    const goodDescription = JSON.parse(
      readFileSyncAsUTF8(join(import.meta.dirname, 'calendar.json')),
    ) as RestDescription;
    vi.spyOn(discovery, 'getRestDescriptionIfPossible').mockImplementation(
      (url: URL) =>
        Promise.resolve(
          url.toString().includes('broken') ? badDescription : goodDescription,
        ),
    );
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    await localApp.discover(undefined, false, true);

    expect(existsSync(join(defaultDiagnosticsPackageDir, 'error.txt'))).toBe(
      true,
    );
  });
});
