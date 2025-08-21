import {tmpdir} from 'node:os';
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
    const testArchivePath = pathToFileURL('/test-package', {windows: false});

    // Call npmPublish
    await helpers.npmPublish(testArchivePath);

    // Verify that runSh was called with the correct command
    expect(runShMock).toHaveBeenCalledTimes(1);
    const calledCommand = runShMock.mock.calls[0][0];

    // Check that the command includes the --provenance flag
    expect(calledCommand).toContain('--provenance');
    expect(calledCommand).toContain('npm publish');
    expect(calledCommand).toContain('--access public');
  });
});
