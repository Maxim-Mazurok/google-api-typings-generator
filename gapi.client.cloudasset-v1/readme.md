# TypeScript typings for Cloud Asset API v1

The Cloud Asset API manages the history and inventory of Google Cloud resources.
For detailed description please check [documentation](https://cloud.google.com/asset-inventory/docs/quickstart).

## Installing

Install typings for Cloud Asset API:

```
npm install @types/gapi.client.cloudasset-v1 --save-dev
```

## Usage

You need to initialize Google API client in your code:

```typescript
gapi.load('client', () => {
  // now we can use gapi.client
  // ...
});
```

Then load api client wrapper:

```typescript
gapi.client.load(
  'https://cloudasset.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.cloudasset
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudasset', 'v1', () => {
  // now we can use:
  // gapi.client.cloudasset
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',
  ],
  immediate = true;
// ...

gapi.auth.authorize(
  {client_id: client_id, scope: scope, immediate: immediate},
  authResult => {
    if (authResult && !authResult.error) {
      /* handle successful authorization */
    } else {
      /* handle authorization error */
    }
  }
);
```

After that you can use Cloud Asset API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Lists assets with time and resource types and returns paged results in response.
*/
await gapi.client.cloudasset.assets.list({parent: 'parent'});

/*
Gets effective IAM policies for a batch of resources.
*/
await gapi.client.cloudasset.effectiveIamPolicies.batchGet({scope: 'scope'});

/*
Creates a feed in a parent project/folder/organization to listen to its asset updates.
*/
await gapi.client.cloudasset.feeds.create({parent: 'parent'});

/*
Deletes an asset feed.
*/
await gapi.client.cloudasset.feeds.delete({name: 'name'});

/*
Gets details about an asset feed.
*/
await gapi.client.cloudasset.feeds.get({name: 'name'});

/*
Lists all asset feeds in a parent project/folder/organization.
*/
await gapi.client.cloudasset.feeds.list({parent: 'parent'});

/*
Updates an asset feed configuration.
*/
await gapi.client.cloudasset.feeds.patch({name: 'name'});

/*
Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
*/
await gapi.client.cloudasset.operations.cancel({name: 'name'});

/*
Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.cloudasset.operations.delete({name: 'name'});

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.cloudasset.operations.get({name: 'name'});

/*
Creates a saved query in a parent project/folder/organization.
*/
await gapi.client.cloudasset.savedQueries.create({parent: 'parent'});

/*
Deletes a saved query.
*/
await gapi.client.cloudasset.savedQueries.delete({name: 'name'});

/*
Gets details about a saved query.
*/
await gapi.client.cloudasset.savedQueries.get({name: 'name'});

/*
Lists all saved queries in a parent project/folder/organization.
*/
await gapi.client.cloudasset.savedQueries.list({parent: 'parent'});

/*
Updates a saved query.
*/
await gapi.client.cloudasset.savedQueries.patch({name: 'name'});

/*
Analyzes IAM policies to answer which identities have what accesses on which resources.
*/
await gapi.client.cloudasset.analyzeIamPolicy({scope: 'scope'});

/*
Analyzes IAM policies asynchronously to answer which identities have what accesses on which resources, and writes the analysis results to a Google Cloud Storage or a BigQuery destination. For Cloud Storage destination, the output format is the JSON format that represents a AnalyzeIamPolicyResponse. This method implements the google.longrunning.Operation, which allows you to track the operation status. We recommend intervals of at least 2 seconds with exponential backoff retry to poll the operation result. The metadata contains the metadata for the long-running operation.
*/
await gapi.client.cloudasset.analyzeIamPolicyLongrunning({scope: 'scope'});

/*
Analyze moving a resource to a specified destination without kicking off the actual move. The analysis is best effort depending on the user's permissions of viewing different hierarchical policies and configurations. The policies and configuration are subject to change before the actual resource migration takes place.
*/
await gapi.client.cloudasset.analyzeMove({resource: 'resource'});

/*
Analyzes organization policies under a scope.
*/
await gapi.client.cloudasset.analyzeOrgPolicies({scope: 'scope'});

/*
Analyzes organization policies governed assets (Google Cloud resources or policies) under a scope. This RPC supports custom constraints and the following canned constraints: * constraints/ainotebooks.accessMode * constraints/ainotebooks.disableFileDownloads * constraints/ainotebooks.disableRootAccess * constraints/ainotebooks.disableTerminal * constraints/ainotebooks.environmentOptions * constraints/ainotebooks.requireAutoUpgradeSchedule * constraints/ainotebooks.restrictVpcNetworks * constraints/compute.disableGuestAttributesAccess * constraints/compute.disableInstanceDataAccessApis * constraints/compute.disableNestedVirtualization * constraints/compute.disableSerialPortAccess * constraints/compute.disableSerialPortLogging * constraints/compute.disableVpcExternalIpv6 * constraints/compute.requireOsLogin * constraints/compute.requireShieldedVm * constraints/compute.restrictLoadBalancerCreationForTypes * constraints/compute.restrictProtocolForwardingCreationForTypes * constraints/compute.restrictXpnProjectLienRemoval * constraints/compute.setNewProjectDefaultToZonalDNSOnly * constraints/compute.skipDefaultNetworkCreation * constraints/compute.trustedImageProjects * constraints/compute.vmCanIpForward * constraints/compute.vmExternalIpAccess * constraints/gcp.detailedAuditLoggingMode * constraints/gcp.resourceLocations * constraints/iam.allowedPolicyMemberDomains * constraints/iam.automaticIamGrantsForDefaultServiceAccounts * constraints/iam.disableServiceAccountCreation * constraints/iam.disableServiceAccountKeyCreation * constraints/iam.disableServiceAccountKeyUpload * constraints/iam.restrictCrossProjectServiceAccountLienRemoval * constraints/iam.serviceAccountKeyExpiryHours * constraints/resourcemanager.accessBoundaries * constraints/resourcemanager.allowedExportDestinations * constraints/sql.restrictAuthorizedNetworks * constraints/sql.restrictNoncompliantDiagnosticDataAccess * constraints/sql.restrictNoncompliantResourceCreation * constraints/sql.restrictPublicIp * constraints/storage.publicAccessPrevention * constraints/storage.restrictAuthTypes * constraints/storage.uniformBucketLevelAccess This RPC only returns either resources of types [supported by search APIs](https://cloud.google.com/asset-inventory/docs/supported-asset-types) or IAM policies.
*/
await gapi.client.cloudasset.analyzeOrgPolicyGovernedAssets({scope: 'scope'});

/*
Analyzes organization policies governed containers (projects, folders or organization) under a scope.
*/
await gapi.client.cloudasset.analyzeOrgPolicyGovernedContainers({
  scope: 'scope',
});

/*
Batch gets the update history of assets that overlap a time window. For IAM_POLICY content, this API outputs history when the asset and its attached IAM POLICY both exist. This can create gaps in the output history. Otherwise, this API outputs history with asset in both non-delete or deleted status. If a specified asset does not exist, this API returns an INVALID_ARGUMENT error.
*/
await gapi.client.cloudasset.batchGetAssetsHistory({parent: 'parent'});

/*
Exports assets with time and resource types to a given Cloud Storage location/BigQuery table. For Cloud Storage location destinations, the output format is newline-delimited JSON. Each line represents a google.cloud.asset.v1.Asset in the JSON format; for BigQuery table destinations, the output table stores the fields in asset Protobuf as columns. This API implements the google.longrunning.Operation API, which allows you to keep track of the export. We recommend intervals of at least 2 seconds with exponential retry to poll the export operation result. For regular-size resource parent, the export operation usually finishes within 5 minutes.
*/
await gapi.client.cloudasset.exportAssets({parent: 'parent'});

/*
Issue a job that queries assets using a SQL statement compatible with [BigQuery SQL](https://cloud.google.com/bigquery/docs/introduction-sql). If the query execution finishes within timeout and there's no pagination, the full query results will be returned in the `QueryAssetsResponse`. Otherwise, full query results can be obtained by issuing extra requests with the `job_reference` from the a previous `QueryAssets` call. Note, the query result has approximately 10 GB limitation enforced by [BigQuery](https://cloud.google.com/bigquery/docs/best-practices-performance-output). Queries return larger results will result in errors.
*/
await gapi.client.cloudasset.queryAssets({parent: 'parent'});

/*
Searches all IAM policies within the specified scope, such as a project, folder, or organization. The caller must be granted the `cloudasset.assets.searchAllIamPolicies` permission on the desired scope, otherwise the request will be rejected.
*/
await gapi.client.cloudasset.searchAllIamPolicies({scope: 'scope'});

/*
Searches all Google Cloud resources within the specified scope, such as a project, folder, or organization. The caller must be granted the `cloudasset.assets.searchAllResources` permission on the desired scope, otherwise the request will be rejected.
*/
await gapi.client.cloudasset.searchAllResources({scope: 'scope'});
```
