import {
  composeEmail,
  decide,
  extractErrorLines,
  Run,
} from '../bin/failure-alert.js';

let nextId = 1;
const run = (conclusion: string | null): Run => {
  const id = nextId++;
  return {
    id,
    conclusion,
    created_at: `2026-09-${String(id).padStart(2, '0')}T10:00:00Z`,
    html_url: `https://github.com/o/r/actions/runs/${id}`,
  };
};
const runs = (...conclusions: string[]) => conclusions.map(run).reverse(); // newest first

describe('decide', () => {
  beforeEach(() => {
    nextId = 1;
  });

  it('alerts on exactly the 3rd consecutive failure', () => {
    const older = runs('success', 'failure', 'failure');
    const decision = decide(run('failure'), older, true, 3);
    expect(decision.kind).toBe('alert');
    expect(decision.kind === 'alert' && decision.streak.map(r => r.id)).toEqual(
      [4, 3, 2],
    );
  });

  it('alerts when history starts with the streak', () => {
    const older = runs('failure', 'failure');
    expect(decide(run('failure'), older, true, 3).kind).toBe('alert');
  });

  it('does not alert before the threshold', () => {
    const older = runs('success', 'failure');
    expect(decide(run('failure'), older, true, 3)).toEqual({
      kind: 'none',
      reason: 'failure #2 in a row',
    });
  });

  it('does not alert again after the threshold', () => {
    const older = runs('success', 'failure', 'failure', 'failure');
    expect(decide(run('failure'), older, true, 3)).toEqual({
      kind: 'none',
      reason: 'failure #4 in a row',
    });
  });

  it('ignores cancelled and skipped runs within a streak', () => {
    const older = runs('success', 'failure', 'cancelled', 'skipped', 'failure');
    expect(decide(run('failure'), older, true, 3).kind).toBe('alert');
  });

  it('counts timed out runs as failures', () => {
    const older = runs('success', 'timed_out', 'failure');
    expect(decide(run('startup_failure'), older, true, 3).kind).toBe('alert');
  });

  it('does nothing for a cancelled run', () => {
    const older = runs('failure', 'failure');
    expect(decide(run('cancelled'), older, true, 3)).toEqual({
      kind: 'none',
      reason: 'conclusion is cancelled',
    });
  });

  it('reports recovery after a long enough streak', () => {
    const older = runs('success', 'failure', 'failure', 'failure', 'failure');
    const decision = decide(run('success'), older, true, 3);
    expect(decision).toMatchObject({
      kind: 'recovered',
      streakMayBeLonger: false,
    });
    expect(decision.kind === 'recovered' && decision.streak).toHaveLength(4);
  });

  it('marks recovered streak as possibly longer when history was cut off', () => {
    const older = runs('failure', 'failure', 'failure');
    expect(decide(run('success'), older, false, 3)).toMatchObject({
      kind: 'recovered',
      streakMayBeLonger: true,
    });
  });

  it('does not report recovery after a short streak', () => {
    const older = runs('success', 'failure', 'failure');
    expect(decide(run('success'), older, true, 3)).toEqual({
      kind: 'none',
      reason: 'success after 2 failure(s)',
    });
  });

  it('does nothing on a regular success', () => {
    expect(decide(run('success'), runs('success'), true, 3).kind).toBe('none');
  });
});

describe('extractErrorLines', () => {
  it('keeps errors, drops timestamps, colors, warnings and duplicates', () => {
    const red = '\x1b[31m';
    const reset = '\x1b[39m';
    const log = [
      '2026-09-28T22:10:31.7614165Z WARNING: compute:v1 has schema "Error" that shadows a TypeScript global type.',
      '2026-09-28T22:10:24.3323123Z Error processing service foo (gapi.client.foo-v1): TypeError: boom',
      `2026-09-28T22:10:25.0000000Z ${red}error${reset} types/foo/index.d.ts: SyntaxError`,
      '2026-09-28T22:10:26.0000000Z all good here',
      '2026-09-28T22:25:10.0820577Z ##[error]Process completed with exit code 2.',
      '2026-09-28T22:25:11.0820577Z ##[error]Process completed with exit code 2.',
    ].join('\n');
    expect(extractErrorLines(log)).toEqual([
      'Error processing service foo (gapi.client.foo-v1): TypeError: boom',
      'error types/foo/index.d.ts: SyntaxError',
      '##[error]Process completed with exit code 2.',
    ]);
  });
});

describe('composeEmail', () => {
  beforeEach(() => {
    nextId = 1;
  });

  it('composes alert email', () => {
    const streak = runs('failure', 'failure');
    const email = composeEmail('Auto Generate Types', {kind: 'alert', streak}, [
      'Error: boom',
    ]);
    expect(email.subject).toBe(
      '[gapi-typings] Auto Generate Types broken: 2 failed runs in a row since 2026-09-01 10:00 UTC',
    );
    expect(email.text).toContain(
      'First failure: 2026-09-01 10:00 UTC https://github.com/o/r/actions/runs/1',
    );
    expect(email.text).toContain(
      'Latest failure: 2026-09-02 10:00 UTC https://github.com/o/r/actions/runs/2',
    );
    expect(email.text).toContain('  Error: boom');
  });

  it('composes recovery email', () => {
    const streak = runs('failure', 'failure');
    const email = composeEmail(
      'Auto Publish to NPM',
      {kind: 'recovered', streak, streakMayBeLonger: true},
      [],
      run('success'),
    );
    expect(email.subject).toBe(
      '[gapi-typings] Auto Publish to NPM recovered after 2+ failed runs',
    );
    expect(email.text).toContain(
      'Recovered: 2026-09-03 10:00 UTC https://github.com/o/r/actions/runs/3',
    );
  });
});
