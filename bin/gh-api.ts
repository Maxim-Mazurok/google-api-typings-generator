import { graphql } from '@octokit/graphql';

export const getBranchNamesOfOpenPRs = async (settings: {
  user: string;
  auth: string;
  dtRepo: string;
}): Promise<string[]> => {
  const headRefNames: string[] = [];
  const { user, auth, dtRepo } = settings;
  const response = await graphql(
    // TODO: add pagination
    `
            {
                search(query: "repo:${dtRepo} is:pr is:open author:${user}", type: ISSUE, last: 100) {
                    edges {
                        node {
                            ... on PullRequest {
                                headRefName
                            }
                        }
                    }
                }
            }
        `,
    {
      headers: {
        authorization: `token ${auth}`,
      },
    }
  );

  if (response && response.search && response.search.edges) {
    (response.search.edges as Array<{
      node?: { headRefName?: string | null } | null;
    } | null>).forEach(
      edge =>
        edge &&
        edge.node &&
        edge.node.headRefName &&
        headRefNames.push(edge.node.headRefName)
    );
  }
  return headRefNames;
};
