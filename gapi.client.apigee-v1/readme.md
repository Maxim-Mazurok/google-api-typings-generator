# TypeScript typings for Apigee API v1

Use the Apigee API to programmatically develop and manage APIs with a set of RESTful operations. Develop and secure API proxies, deploy and undeploy API proxy revisions, monitor APIs, configure environments, manage users, and more. Note: This product is available as a free trial for a time period of 60 days.
For detailed description please check [documentation](https://cloud.google.com/apigee-api-management/).

## Installing

Install typings for Apigee API:

```
npm install @types/gapi.client.apigee-v1 --save-dev
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
  'https://apigee.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.apigee
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('apigee', 'v1', () => {
  // now we can use:
  // gapi.client.apigee
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
  },
);
```

After that you can use Apigee API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Creates an Apigee organization. See [Create an Apigee organization](https://cloud.google.com/apigee/docs/api-platform/get-started/create-org).
*/
await gapi.client.apigee.organizations.create({});

/*
Delete an Apigee organization. For organizations with BillingType EVALUATION, an immediate deletion is performed. For paid organizations (Subscription or Pay-as-you-go), a soft-deletion is performed. The organization can be restored within the soft-deletion period, which is specified using the `retention` field in the request or by filing a support ticket with Apigee. During the data retention period specified in the request, the Apigee organization cannot be recreated in the same Google Cloud project. **IMPORTANT: The default data retention setting for this operation is 7 days. To permanently delete the organization in 24 hours, set the retention parameter to `MINIMUM`.**
*/
await gapi.client.apigee.organizations.delete({name: 'name'});

/*
Gets the profile for an Apigee organization. See [Understanding organizations](https://cloud.google.com/apigee/docs/api-platform/fundamentals/organization-structure).
*/
await gapi.client.apigee.organizations.get({name: 'name'});

/*
Lists the service accounts allowed to access Apigee control plane directly for limited functionality. **Note**: Available to Apigee hybrid only.
*/
await gapi.client.apigee.organizations.getControlPlaneAccess({name: 'name'});

/*
Gets the deployed ingress configuration for an organization.
*/
await gapi.client.apigee.organizations.getDeployedIngressConfig({name: 'name'});

/*
Gets the project ID and region for an Apigee organization.
*/
await gapi.client.apigee.organizations.getProjectMapping({name: 'name'});

/*
Get runtime config for an organization.
*/
await gapi.client.apigee.organizations.getRuntimeConfig({name: 'name'});

/*
GetSecuritySettings gets the security settings for API Security.
*/
await gapi.client.apigee.organizations.getSecuritySettings({name: 'name'});

/*
Lists the service accounts with the permissions required to allow the Synchronizer to download environment data from the control plane. An ETag is returned in the response to `getSyncAuthorization`. Pass that ETag when calling [setSyncAuthorization](setSyncAuthorization) to ensure that you are updating the correct version. If you don't pass the ETag in the call to `setSyncAuthorization`, then the existing authorization is overwritten indiscriminately. For more information, see [Configure the Synchronizer](https://cloud.google.com/apigee/docs/hybrid/latest/synchronizer-access). **Note**: Available to Apigee hybrid only.
*/
await gapi.client.apigee.organizations.getSyncAuthorization({name: 'name'});

/*
Lists the Apigee organizations and associated Google Cloud projects that you have permission to access. See [Understanding organizations](https://cloud.google.com/apigee/docs/api-platform/fundamentals/organization-structure).
*/
await gapi.client.apigee.organizations.list({parent: 'parent'});

/*
Configures the add-ons for the Apigee organization. The existing add-on configuration will be fully replaced.
*/
await gapi.client.apigee.organizations.setAddons({org: 'org'});

/*
Sets the permissions required to allow the Synchronizer to download environment data from the control plane. You must call this API to enable proper functioning of hybrid. Pass the ETag when calling `setSyncAuthorization` to ensure that you are updating the correct version. To get an ETag, call [getSyncAuthorization](getSyncAuthorization). If you don't pass the ETag in the call to `setSyncAuthorization`, then the existing authorization is overwritten indiscriminately. For more information, see [Configure the Synchronizer](https://cloud.google.com/apigee/docs/hybrid/latest/synchronizer-access). **Note**: Available to Apigee hybrid only.
*/
await gapi.client.apigee.organizations.setSyncAuthorization({name: 'name'});

/*
Updates the properties for an Apigee organization. No other fields in the organization profile will be updated.
*/
await gapi.client.apigee.organizations.update({name: 'name'});

/*
Updates the permissions required to allow Apigee runtime-plane components access to the control plane. Currently, the permissions required are to: 1. Allow runtime components to publish analytics data to the control plane. **Note**: Available to Apigee hybrid only.
*/
await gapi.client.apigee.organizations.updateControlPlaneAccess({name: 'name'});

/*
UpdateSecuritySettings updates the current security settings for API Security.
*/
await gapi.client.apigee.organizations.updateSecuritySettings({name: 'name'});

/*
Provisions a new Apigee organization with a functioning runtime. This is the standard way to create trial organizations for a free Apigee trial.
*/
await gapi.client.apigee.projects.provisionOrganization({project: 'project'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.apigee-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
