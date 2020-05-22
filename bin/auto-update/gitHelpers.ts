import {join} from 'path';
import {Settings} from './index';
import {Git} from './git';
import {revisionPrefix} from '../../src/app';

export class GitHelpers {
  readonly settings: Settings;
  readonly git: Git;

  constructor(git: Git, settings: Settings) {
    this.settings = settings;
    this.git = git;
  }

  onlyRevisionChanged = async (type: string): Promise<boolean> => {
    const cmd = `git diff master..origin/${type} --unified=0 types/${type}/*`;
    const diff = (await this.git.sh.trySh(cmd)).stdout
      .split('\n')
      .splice(5)
      .join('\n');
    return new RegExp(
      `^-${revisionPrefix}\\d+\\n\\+${revisionPrefix}\\d+\\n$`
    ).test(diff);
  };

  setConfig = async (): Promise<void> => {
    const {userEmail, userName} = this.settings;
    await this.git.sh.trySh(`git config --global user.email "${userEmail}"`);
    await this.git.sh.trySh(`git config --global user.name "${userName}"`);
  };

  checkForTemplateUpdate = async (): Promise<void> => {
    console.log('Checking for template update...');

    const {
      user,
      dtRepoOwner: owner,
      dtRepoName: repo,
      thisRepo,
      templateUpdateLabel: label,
    } = this.settings;
    const metrics = await this.git.octokit.repos.retrieveCommunityProfileMetrics(
      {
        owner,
        repo,
        mediaType: {
          previews: ['black-panther'],
        },
      }
    );
    const pullRequestTemplateURL = metrics.data.files.pull_request_template.url;
    const pullRequestTemplateSHA = (
      await this.git.octokit.request<{sha: string}>({
        method: 'GET',
        url: pullRequestTemplateURL,
      })
    ).data.sha;

    if (pullRequestTemplateSHA !== this.settings.pullRequestTemplateSHA) {
      console.log(
        'PR template is outdated, checking for the existing issue...'
      );

      const noOpenIssue =
        (
          await this.git.octokit.issues.list({
            state: 'open',
            labels: label,
          })
        ).data.length === 0;

      if (noOpenIssue) {
        console.log('Creating an issue to update PR...');

        await this.git.octokit.issues.create({
          owner: user,
          repo: thisRepo,
          title: 'Update PR template',
          body: `Please, update [PR template](https://github.com/DefinitelyTyped/DefinitelyTyped/commits/master/.github/PULL_REQUEST_TEMPLATE.md), local SHA \`${this.settings.pullRequestTemplateSHA}\` doesn't match latest SHA \`${pullRequestTemplateSHA}\``,
          assignees: [user],
          labels: [label],
        });
      }
    }
  };

  openPRIfItDoesNotExist = async (gapiTypeName: string): Promise<void> => {
    const {
      user,
      dtRepoOwner: owner,
      dtRepoName: repo,
      thisRepo,
    } = this.settings;

    console.log(`Opening PR for ${gapiTypeName}...`);

    try {
      await this.git.octokit.pulls.create({
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
  - [x] Provide a URL to documentation or source code which provides context for the suggested changes: https://github.com/${user}/${thisRepo}#${thisRepo}
  - [x] If this PR brings the type definitions up to date with a new version of the JS library, update the version number in the header.
  - [x] Include [tests for your changes](https://github.com/DefinitelyTyped/DefinitelyTyped#testing)
  - [x] If you are making substantial changes, consider adding a \`tslint.json\` containing \`{ "extends": "dtslint/dt.json" }\`. If for reason the any rule need to be disabled, disable it for that line using \`// tslint:disable-next-line [ruleName]\` and not for whole package so that the need for disabling can be reviewed.

  ----

  🤖 This pull request was automatically created by [${user}/${thisRepo}](https://github.com/${user}/${thisRepo}) which generates types from [Google API Discovery Service](https://developers.google.com/discovery). Types were linted and tested before submission.

  If there is an issue with this pull request, consider [submitting a new issue](https://github.com/${user}/${thisRepo}/issues/new).

  Note you can also [use these types](https://github.com/${user}/${thisRepo}/issues/85#issuecomment-601133279) from our [\`types\` branch](https://github.com/${user}/${thisRepo}/tree/types) which is updated hourly.
  `,
      });
    } catch (e) {
      if (
        e &&
        e.errors &&
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

  cloneDTFork = async (): Promise<void> => {
    // clone only last commit for every branch
    const {user, auth, dtRepoName, dtForkPath} = this.settings;
    const cmd = `git clone --depth=1 https://${user}:${auth}@github.com/${user}/${dtRepoName} --no-single-branch ${dtForkPath}`;
    await this.git.sh.trySh(cmd, __dirname);
  };

  addRemote = async (): Promise<void> => {
    const {user, auth, dtRepoOwner, dtRepoName} = this.settings;
    const cmd = `git remote add upstream https://${user}:${auth}@github.com/${dtRepoOwner}/${dtRepoName}`;
    await this.git.sh.trySh(cmd);
  };

  updateDTFork = async (): Promise<void> => {
    // Rebase master
    await this.addRemote();
    const dateSince = await this.git.getDateSince();
    await this.git.updateDTForkFromUpstream(dateSince);
    await this.git.reset({hard: true, to: 'upstream/master', quiet: false}); // reset fork to upstream
    await this.git.push();
  };

  stageTypesFolder = async (name: string): Promise<void> => {
    const {typesDirName} = this.settings;
    const cmd = `git add ${join(typesDirName, name)}`;
    await this.git.sh.trySh(cmd);
  };
}
