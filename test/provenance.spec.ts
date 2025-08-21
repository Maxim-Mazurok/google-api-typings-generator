import {describe, expect, it, vi, type MockedFunction} from 'vitest';
import {Helpers} from '../bin/auto-publish/helpers.js';
import {SH} from '../bin/auto-publish/sh.js';
import {GitHub} from '../bin/auto-publish/git-hub.js';

describe('NPM Provenance', () => {
  it('should include --provenance flag in npm publish command', async () => {
    // Mock SH class
    const mockSh = {
      runSh: vi.fn().mockResolvedValue(undefined),
    } as unknown as SH;

    // Mock GitHub class
    const mockGitHub = {} as unknown as GitHub;

    // Mock settings
    const mockSettings = {
      typesDirName: 'types',
      typesBranchName: 'types',
      user: 'test-user',
      auth: 'test-token',
      thisRepo: 'test-repo',
    };

    const helpers = new Helpers(mockSh, mockGitHub, mockSettings);

    // Create a test archive path
    const testArchivePath = new URL('file:///tmp/test-package.tgz');

    // Call npmPublish
    await helpers.npmPublish(testArchivePath);

    // Verify that runSh was called with the correct command
    expect(mockSh.runSh).toHaveBeenCalledTimes(1);
    const calledCommand = (mockSh.runSh as MockedFunction<typeof mockSh.runSh>)
      .mock.calls[0][0];

    // Check that the command includes the --provenance flag
    expect(calledCommand).toContain('--provenance');
    expect(calledCommand).toContain('npm publish');
    expect(calledCommand).toContain('--access public');
  });
});
