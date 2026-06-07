import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {describe, expect, it, vi} from 'vitest';
import {GitHub} from '../bin/auto-publish/git-hub.js';
import {Helpers} from '../bin/auto-publish/helpers.js';
import {Settings} from '../bin/auto-publish/index.js';
import {SH} from '../bin/auto-publish/sh.js';

describe('NPM Provenance', () => {
  it('should include --provenance flag in npm publish command', async () => {
    // Mock SH class
    const runShMock = vi.fn().mockResolvedValue(undefined);
    const mockSh: Partial<SH> = {
      runSh: runShMock,
    };

    // Mock settings
    const mockSettings: Settings = {
      typesDirName: 'types',
      typesBranchName: 'types',
      user: 'test-user',
      auth: 'test-token',
      thisRepo: 'test-repo',
    };

    const helpers = new Helpers(
      mockSh as unknown as SH,
      {} as unknown as GitHub,
      mockSettings,
    );

    // Create a test path
    const testArchivePath = pathToFileURL(resolve('test-package.tgz'));

    // Call npmPublish
    await helpers.npmPublish(testArchivePath);

    // Verify that runSh was called with the correct command
    expect(runShMock).toHaveBeenCalledTimes(1);
    const calledCommand = runShMock.mock.calls[0][0];

    // Check that the command includes the --provenance flag
    expect(calledCommand).toContain('--provenance');
    expect(calledCommand).toContain('npm publish');
    expect(calledCommand).toContain('--access public');
    expect(calledCommand).not.toContain('--userconfig'); // cspell:words userconfig
  });

  it('publishes initializer package with token auth and without provenance', async () => {
    const originalFetch = globalThis.fetch;
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });
    globalThis.fetch = fetchMock;
    let initializerPackageJson: unknown;
    const runShMock = vi.fn().mockImplementation((command: string) => {
      const initializerPath = command.split(' ').at(-1);
      if (!initializerPath) {
        throw new Error(`Could not parse initializer path from ${command}`);
      }
      initializerPackageJson = JSON.parse(
        readFileSync(resolve(initializerPath, 'package.json'), 'utf8'),
      );
      return Promise.resolve(undefined);
    });
    const mockSh: Partial<SH> = {
      runSh: runShMock,
    };
    const mockSettings: Settings = {
      typesDirName: 'types',
      typesBranchName: 'types',
      user: 'test-user',
      auth: 'test-token',
      thisRepo: 'test-repo',
    };
    const helpers = new Helpers(
      mockSh as unknown as SH,
      {} as unknown as GitHub,
      mockSettings,
      '/tmp/test-npmrc',
    );

    try {
      await helpers.ensureNpmPackagePublished('@scope/package');
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(runShMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://registry.npmjs.org/%40scope%2Fpackage',
    );
    const calledCommand = runShMock.mock.calls[0][0];
    expect(calledCommand).toContain('npm publish');
    expect(calledCommand).toContain('--access public');
    expect(calledCommand).toContain('--userconfig /tmp/test-npmrc'); // cspell:words userconfig
    expect(calledCommand).not.toContain('--provenance');
    expect(initializerPackageJson).toMatchObject({
      name: '@scope/package',
      version: '0.0.0',
      types: 'index.d.ts',
    });
  });

  it('does not publish initializer package when npm package already exists', async () => {
    const originalFetch = globalThis.fetch;
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
    });
    globalThis.fetch = fetchMock;
    const runShMock = vi.fn().mockResolvedValue(undefined);
    const mockSettings: Settings = {
      typesDirName: 'types',
      typesBranchName: 'types',
      user: 'test-user',
      auth: 'test-token',
      thisRepo: 'test-repo',
    };
    const helpers = new Helpers(
      {runSh: runShMock} as unknown as SH,
      {} as unknown as GitHub,
      mockSettings,
      '/tmp/test-npmrc',
    );

    try {
      await helpers.ensureNpmPackagePublished('@scope/package');
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(runShMock).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://registry.npmjs.org/%40scope%2Fpackage',
    );
  });
});
