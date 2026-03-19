import {
  filterFilesForCspell,
  getNpxSpawnCommand,
  normalizePathSeparators,
  parseGitFileList,
  shouldIncludeInCspell,
} from '../src/cspell.js';

describe('normalizePathSeparators', () => {
  it('normalizes Windows separators for path matching', () => {
    expect(normalizePathSeparators('test\\restDocs\\calendar.json')).toBe(
      'test/restDocs/calendar.json',
    );
  });
});

describe('shouldIncludeInCspell', () => {
  it('excludes generated restDocs fixtures regardless of separator style', () => {
    expect(shouldIncludeInCspell('test/restDocs/calendar.json')).toBe(false);
    expect(shouldIncludeInCspell('test\\restDocs\\calendar.json')).toBe(false);
    expect(
      shouldIncludeInCspell(
        'test\\restDocs\\results\\gapi.client.drive-v3\\index.d.ts',
      ),
    ).toBe(false);
    expect(
      shouldIncludeInCspell('test\\restDocs\\__snapshots__\\test.spec.ts.snap'),
    ).toBe(false);
  });

  it('keeps non-generated project files', () => {
    expect(shouldIncludeInCspell('src/app.ts')).toBe(true);
    expect(shouldIncludeInCspell('test\\restDocs\\test.spec.ts')).toBe(true);
  });
});

describe('getNpxSpawnCommand', () => {
  it('uses cmd.exe on Windows', () => {
    expect(
      getNpxSpawnCommand(['-y', 'cspell', '--file-list', 'stdin'], 'win32'),
    ).toStrictEqual({
      command: 'cmd.exe',
      args: ['/d', '/s', '/c', 'npx', '-y', 'cspell', '--file-list', 'stdin'],
    });
  });

  it('uses npx directly on non-Windows platforms', () => {
    expect(getNpxSpawnCommand(['-y', 'cspell'], 'linux')).toStrictEqual({
      command: 'npx',
      args: ['-y', 'cspell'],
    });
  });
});

describe('parseGitFileList', () => {
  it('parses null-separated git ls-files output', () => {
    expect(
      parseGitFileList(
        ['src/app.ts', 'test\\restDocs\\calendar.json', 'README.md', ''].join(
          '\0',
        ),
      ),
    ).toStrictEqual([
      'src/app.ts',
      'test\\restDocs\\calendar.json',
      'README.md',
    ]);
  });
});

describe('filterFilesForCspell', () => {
  it('filters git-discovered files with mixed separator styles', () => {
    expect(
      filterFilesForCspell([
        'src/app.ts',
        'test\\restDocs\\calendar.json',
        'test/restDocs/results/gapi.client.drive-v3/index.d.ts',
        'test/restDocs/__snapshots__/test.spec.ts.snap',
        'test\\restDocs\\test.spec.ts',
      ]),
    ).toStrictEqual(['src/app.ts', 'test\\restDocs\\test.spec.ts']);
  });
});
