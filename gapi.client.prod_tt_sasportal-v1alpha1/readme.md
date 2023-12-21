# TypeScript typings for SAS Portal API (Testing) v1alpha1

For detailed description please check [documentation](https://developers.google.com/spectrum-access-system/).

## Installing

Install typings for SAS Portal API (Testing):

```
npm install @types/gapi.client.prod_tt_sasportal-v1alpha1 --save-dev
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
  'https://prod-tt-sasportal.googleapis.com/$discovery/rest?version=v1alpha1',
  () => {
    // now we can use:
    // gapi.client.prod_tt_sasportal
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('prod_tt_sasportal', 'v1alpha1', () => {
  // now we can use:
  // gapi.client.prod_tt_sasportal
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // Read, create, update, and delete your SAS Portal data.
    'https://www.googleapis.com/auth/sasportal',
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

After that you can use SAS Portal API (Testing) resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Checks whether a SAS deployment for the authentication context exists.
*/
await gapi.client.prod_tt_sasportal.customers.checkHasProvisionedDeployment({});

/*
Returns a requested customer.
*/
await gapi.client.prod_tt_sasportal.customers.get({name: 'name'});

/*
Returns a list of requested customers.
*/
await gapi.client.prod_tt_sasportal.customers.list({});

/*
Checks whether account is legacy.
*/
await gapi.client.prod_tt_sasportal.customers.listLegacyOrganizations({});

/*
Migrates a SAS organization to the cloud. This will create GCP projects for each deployment and associate them. The SAS Organization is linked to the gcp project that called the command. go/sas-legacy-customer-migration
*/
await gapi.client.prod_tt_sasportal.customers.migrateOrganization({});

/*
Updates an existing customer.
*/
await gapi.client.prod_tt_sasportal.customers.patch({name: 'name'});

/*
Creates a new SAS deployment through the GCP workflow. Creates a SAS organization if an organization match is not found.
*/
await gapi.client.prod_tt_sasportal.customers.provisionDeployment({});

/*
Setups the a GCP Project to receive SAS Analytics messages via GCP Pub/Sub with a subscription to BigQuery. All the Pub/Sub topics and BigQuery tables are created automatically as part of this service.
*/
await gapi.client.prod_tt_sasportal.customers.setupSasAnalytics({});

/*
Returns a requested deployment.
*/
await gapi.client.prod_tt_sasportal.deployments.get({name: 'name'});

/*
Generates a secret to be used with the ValidateInstaller.
*/
await gapi.client.prod_tt_sasportal.installer.generateSecret({});

/*
Validates the identity of a Certified Professional Installer (CPI).
*/
await gapi.client.prod_tt_sasportal.installer.validate({});

/*
Returns a requested node.
*/
await gapi.client.prod_tt_sasportal.nodes.get({name: 'name'});

/*
Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
*/
await gapi.client.prod_tt_sasportal.policies.get({});

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.prod_tt_sasportal.policies.set({});

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.prod_tt_sasportal.policies.test({});
```
