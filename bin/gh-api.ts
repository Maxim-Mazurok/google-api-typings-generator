import { Octokit } from '@octokit/rest';

export const openPRIfItDoesntExist = async ({
  user,
  auth,
  thisRepo,
  dtRepoOwner: owner,
  dtRepoName: repo,
  gapiTypeName,
}: {
  user: string;
  auth: string;
  thisRepo: string;
  dtRepoOwner: string;
  dtRepoName: string;
  gapiTypeName: string;
}): Promise<void> => {
  const octokit = new Octokit({
    auth,
    userAgent: `${user}/${thisRepo}`,
    timeZone: 'UTC',
  });

  console.log(`Opening PR for ${gapiTypeName}...`);

  try {
    await octokit.pulls.create({
      owner,
      repo,
      title: `[${gapiTypeName}] automatic update`,
      head: `${user}:${gapiTypeName}`,
      base: 'master',
      // TODO: check for updates in the template (using retrieveCommunityProfileMetrics from black-panther-preview, maybe) but it doesn't seem to be updated often
      body: `
- [x] Use a meaningful title for the pull request. Include the name of the package modified.
- [x] Test the change in your own code. (Compile and run.)
- [x] Add or edit tests to reflect the change. (Run with \`npm test\`.)
- [x] Follow the advice from the [readme](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.md#make-a-pull-request).
- [x] Avoid [common mistakes](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.md#common-mistakes).
- [x] Run \`npm run lint package-name\` (or \`tsc\` if no \`tslint.json\` is present).

Select one of these and delete the others:

If changing an existing definition:
- [x] Provide a URL to documentation or source code which provides context for the suggested changes: https://github.com/Maxim-Mazurok/google-api-typings-generator#google-api-typings-generator
- [x] If this PR brings the type definitions up to date with a new version of the JS library, update the version number in the header.
- [x] If you are making substantial changes, consider adding a \`tslint.json\` containing \`{ "extends": "dtslint/dt.json" }\`. If for reason the any rule need to be disabled, disable it for that line using \`// tslint:disable-next-line [ruleName]\` and not for whole package so that the need for disabling can be reviewed.

----

Please, note: this PR was created automatically by [Maxim-Mazurok/google-api-typings-generator](https://github.com/Maxim-Mazurok/google-api-typings-generator).
Types are generated automatically from [Google API Discovery Service](https://developers.google.com/discovery).
Before submitting this PR, types were linted and tested automatically.
Alternatively, you can [use](https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/85#issuecomment-601133279) these typings from our [\`types\` branch](https://github.com/Maxim-Mazurok/google-api-typings-generator/tree/types) which gets updated, linted and tested every hour.
In case if something is wrong with this PR or the template needs to be updated - please, [submit new issue](https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/new).
`,
    });
  } catch (e) {
    if (
      e & e.errors &&
      e.errors[0] &&
      e.errors[0].message &&
      e.errors[0].message.indexOf('pull request already exists') !== -1
    ) {
      console.warn(`Open PR for ${gapiTypeName} already exists`);
    } else {
      console.error(e);
      throw new Error(`Failed to open PR for ${gapiTypeName}`);
    }
  }
};
