import {SH} from './sh.js';
import {Octokit} from '@octokit/rest';
import {createOctokit} from './helpers.js';
import {sleep} from '../../src/utils.js';

export interface Settings {
  user: string; // user who commits
  auth: string; // GH token with public_repo access
  thisRepo: string; // repo form where API calls to GH will be made
}

export class Git {
  readonly settings: Settings;
  readonly sh: SH;
  readonly octokit: Octokit;

  constructor(sh: SH, settings: Settings) {
    this.sh = sh;
    this.settings = settings;

    const {user, auth, thisRepo} = this.settings;

    this.octokit = createOctokit({auth, user, thisRepo});
  }

  getArchiveLink = async (
    commitSHA: string,
    retries = 3,
    retryTimeout = 3000 // ms
  ): Promise<string> => {
    retries--;
    console.log(`Getting archive link for ${commitSHA}...`);

    const {user: owner, thisRepo: repo} = this.settings;
    try {
      const response = await this.octokit.repos.downloadTarballArchive({
        owner,
        repo,
        ref: commitSHA,
        method: 'HEAD',
      });
      return response.url;
    } catch (e) {
      console.error(e);
      sleep(retryTimeout);
      return this.getArchiveLink(commitSHA, retries);
    }
  };

  getLatestCommitHash = async ({
    owner,
    repo,
    branch,
  }: {
    owner: string;
    repo: string;
    branch: string;
  }): Promise<string> => {
    console.log(`Getting latest commit SHA for ${owner}/${repo}/${branch}...`);

    const branchData = await this.octokit.repos.getBranch({
      owner,
      repo,
      branch,
    });

    return branchData.data.commit.sha;
  };
}
