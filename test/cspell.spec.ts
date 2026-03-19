import {
  filterFilesForCspell,
  normalizePathSeparators,
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

describe('filterFilesForCspell', () => {
  it('filters ls-ignore output with mixed line endings and separators', () => {
    const lsIgnoreOutput = [
      'src/app.ts',
      'test\\restDocs\\calendar.json',
      'test/restDocs/results/gapi.client.drive-v3/index.d.ts',
      'test/restDocs/__snapshots__/test.spec.ts.snap',
      'test\\restDocs\\test.spec.ts',
      '',
    ].join('\r\n');

    expect(filterFilesForCspell(lsIgnoreOutput)).toStrictEqual([
      'src/app.ts',
      'test\\restDocs\\test.spec.ts',
    ]);
  });
});
