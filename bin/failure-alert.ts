/**
 * Emails the maintainer once when a workflow has failed THRESHOLD times in a
 * row, and once when it recovers.
 *
 * Stateless: GitHub run history is the memory. Each workflow run is evaluated
 * once (by `.github/workflows/failure-alert.yml`), and only the run that is
 * exactly the THRESHOLD-th consecutive failure sends the alert; the 11th, 12th,
 * ... failures don't. Likewise only the first success after a streak of
 * THRESHOLD+ failures sends the recovery email.
 *
 * Runs directly with node (type stripping), no dependencies, so the workflow
 * doesn't need `npm ci`.
 */
import {fileURLToPath} from 'node:url';

export const THRESHOLD = 10;

// don't page through more history than this looking for where a streak began
const MAX_PAGES = 5;
const PER_PAGE = 100;

export interface Run {
  id: number;
  conclusion: string | null;
  created_at: string;
  html_url: string;
}

export type Decision =
  | {kind: 'none'; reason: string}
  | {kind: 'alert'; streak: Run[]}
  | {kind: 'recovered'; streak: Run[]; streakMayBeLonger: boolean};

const failedConclusions = new Set(['failure', 'timed_out', 'startup_failure']);

export const isFailure = (run: Run) =>
  failedConclusions.has(run.conclusion ?? '');
const isSuccess = (run: Run) => run.conclusion === 'success';
// cancelled, skipped, etc. neither extend nor break a streak
const counts = (run: Run) => isFailure(run) || isSuccess(run);

const leadingFailures = (runs: Run[]): Run[] => {
  const index = runs.findIndex(run => !isFailure(run));
  return index === -1 ? runs : runs.slice(0, index);
};

/**
 * @param current the run being evaluated
 * @param older completed runs of the same workflow and branch created before
 * `current`, newest first
 * @param historyComplete whether `older` goes all the way back (no more pages)
 */
export const decide = (
  current: Run,
  older: Run[],
  historyComplete: boolean,
  threshold = THRESHOLD,
): Decision => {
  if (!counts(current)) {
    return {kind: 'none', reason: `conclusion is ${current.conclusion}`};
  }

  const previousFailures = leadingFailures(older.filter(counts));
  const previousStreakEnded =
    previousFailures.length < older.filter(counts).length;

  if (isFailure(current)) {
    const streakLength = 1 + previousFailures.length;
    if (streakLength === threshold) {
      return {kind: 'alert', streak: [current, ...previousFailures]};
    }
    return {kind: 'none', reason: `failure #${streakLength} in a row`};
  }

  if (previousFailures.length >= threshold) {
    return {
      kind: 'recovered',
      streak: previousFailures,
      streakMayBeLonger: !previousStreakEnded && !historyComplete,
    };
  }
  return {
    kind: 'none',
    reason: `success after ${previousFailures.length} failure(s)`,
  };
};

const formatDate = (iso: string) =>
  iso.replace('T', ' ').replace(/:\d\d(\.\d+)?Z$/, ' UTC');

/** Picks the interesting lines out of a failed job log. */
export const extractErrorLines = (log: string, max = 20): string[] => {
  const lines = log
    .split(/\r?\n/)
    .map(line =>
      line
        .replace(/^\d{4}-\d\d-\d\dT[\d:.]+Z\s?/, '') // timestamp
        // eslint-disable-next-line no-control-regex
        .replace(/\x1b\[[\d;]*m/g, '') // colors
        .trim(),
    )
    .filter(
      line =>
        !line.startsWith('WARNING') && // e.g. schema "Error" shadows a global
        /##\[error\]|\berror\b|ERR!|FAILURE/i.test(line),
    )
    .map(line => (line.length > 300 ? `${line.slice(0, 300)}…` : line));
  return [...new Set(lines)].slice(0, max);
};

export const composeEmail = (
  workflowName: string,
  decision: Exclude<Decision, {kind: 'none'}>,
  errorLines: string[],
  recoveredBy?: Run,
) => {
  const streak = decision.streak;
  const first = streak[streak.length - 1];
  const latest = streak[0];

  if (decision.kind === 'alert') {
    return {
      subject: `[gapi-typings] ${workflowName} broken: ${streak.length} failed runs in a row since ${formatDate(first.created_at)}`,
      text: [
        `${workflowName} has failed ${streak.length} times in a row. You won't get another email until it recovers.`,
        '',
        `First failure: ${formatDate(first.created_at)} ${first.html_url}`,
        `Latest failure: ${formatDate(latest.created_at)} ${latest.html_url}`,
        '',
        errorLines.length > 0
          ? `Errors from the latest failure:\n${errorLines.map(line => `  ${line}`).join('\n')}`
          : 'Could not extract error lines, see the run log.',
      ].join('\n'),
    };
  }

  const length = `${streak.length}${decision.streakMayBeLonger ? '+' : ''}`;
  return {
    subject: `[gapi-typings] ${workflowName} recovered after ${length} failed runs`,
    text: [
      `${workflowName} is passing again after ${length} failed runs in a row.`,
      '',
      `Failing since: ${formatDate(first.created_at)} ${first.html_url}`,
      recoveredBy
        ? `Recovered: ${formatDate(recoveredBy.created_at)} ${recoveredBy.html_url}`
        : '',
    ].join('\n'),
  };
};

const main = async () => {
  const env = (name: string) => {
    const value = process.env[name];
    if (!value) throw new Error(`${name} is not set`);
    return value;
  };
  const repo = env('GITHUB_REPOSITORY');
  const token = env('GITHUB_TOKEN');
  const runId = env('RUN_ID');
  const dryRun = process.env.DRY_RUN === 'true';
  const test = process.env.TEST === 'true';

  const github = async <T>(path: string): Promise<T> => {
    const response = await fetch(
      `https://api.github.com/repos/${repo}${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
        },
      },
    );
    if (!response.ok) {
      throw new Error(
        `GET ${path}: ${response.status} ${await response.text()}`,
      );
    }
    return (await response.json()) as T;
  };

  const current = await github<
    Run & {
      workflow_id: number;
      name: string;
      head_branch: string;
      run_attempt: number;
    }
  >(`/actions/runs/${runId}`);
  console.log(
    `Evaluating ${current.name} run ${current.id} (attempt ${current.run_attempt}, ${current.conclusion}, ${current.head_branch})`,
  );
  if (current.run_attempt > 1 && !test) {
    // a re-run of an already evaluated run, don't count it twice
    console.log('Re-run attempt, skipping');
    return;
  }

  // The run list API occasionally returns a wrong page (e.g. an older page in
  // place of page 1). Deciding on it could silently skip an alert, so check
  // that the list starts at the evaluated run and pages continue each other,
  // and retry otherwise.
  const listOlderRuns = async () => {
    const older: Run[] = [];
    let lowestId = Infinity;
    let historyComplete = false;
    for (let page = 1; page <= MAX_PAGES; page++) {
      const {workflow_runs} = await github<{workflow_runs: Run[]}>(
        `/actions/workflows/${current.workflow_id}/runs?branch=${encodeURIComponent(current.head_branch)}&status=completed&created=${encodeURIComponent(`<=${current.created_at}`)}&per_page=${PER_PAGE}&page=${page}`,
      );
      if (page === 1 && !workflow_runs.some(run => run.id === current.id)) {
        return {problem: `run ${current.id} missing from page 1`};
      }
      if (page > 1 && workflow_runs.some(run => run.id >= lowestId)) {
        return {problem: `page ${page} doesn't continue the previous one`};
      }
      lowestId = Math.min(lowestId, ...workflow_runs.map(run => run.id));
      // page 1 may also have runs created in the same second after the current one
      older.push(...workflow_runs.filter(run => run.id < current.id));
      if (workflow_runs.length < PER_PAGE) {
        historyComplete = true;
        break;
      }
      // enough to decide once we see where the previous failure streak ended
      const countingOlder = older.filter(counts);
      if (
        leadingFailures(countingOlder).length < countingOlder.length ||
        (isFailure(current) && countingOlder.length >= THRESHOLD)
      ) {
        break;
      }
    }
    older.sort((a, b) => b.id - a.id);
    return {older, historyComplete};
  };

  let listing = await listOlderRuns();
  for (let retry = 1; 'problem' in listing && retry <= 3; retry++) {
    console.log(`Inconsistent run list (${listing.problem}), retry ${retry}/3`);
    await new Promise(resolve => setTimeout(resolve, 20_000 * retry));
    listing = await listOlderRuns();
  }
  if ('problem' in listing) {
    throw new Error(`Inconsistent run list: ${listing.problem}`);
  }
  const {older, historyComplete} = listing;

  const decision = decide(current, older, historyComplete);
  if (decision.kind === 'none') {
    console.log(`Nothing to send: ${decision.reason}`);
    return;
  }

  let errorLines: string[] = [];
  if (decision.kind === 'alert') {
    try {
      const {jobs} = await github<{jobs: {id: number; conclusion: string}[]}>(
        `/actions/runs/${current.id}/jobs`,
      );
      for (const job of jobs.filter(job => job.conclusion === 'failure')) {
        // redirects to a pre-signed URL; fetch drops the auth header cross-origin
        const response = await fetch(
          `https://api.github.com/repos/${repo}/actions/jobs/${job.id}/logs`,
          {headers: {Authorization: `Bearer ${token}`}},
        );
        if (response.ok)
          errorLines.push(...extractErrorLines(await response.text()));
      }
      errorLines = [...new Set(errorLines)].slice(0, 20);
    } catch (error) {
      console.warn('Failed to fetch job logs:', error);
    }
  }

  const email = composeEmail(
    current.name,
    decision,
    errorLines,
    decision.kind === 'recovered' ? current : undefined,
  );
  if (test) email.subject = `[TEST] ${email.subject}`;
  console.log(`Subject: ${email.subject}\n\n${email.text}`);

  if (dryRun) {
    console.log('\nDry run, not sending');
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:
        process.env.ALERT_FROM || 'GAPI typings alerts <onboarding@resend.dev>',
      to: [env('ALERT_EMAIL')],
      subject: email.subject,
      text: email.text,
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend: ${response.status} ${await response.text()}`);
  }
  console.log('\nSent', await response.json());
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
