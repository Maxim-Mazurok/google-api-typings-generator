# TypeScript typings for Cloud Asset API v1p1beta1

The cloud asset API manages the history and inventory of cloud resources.
For detailed description please check [documentation](https://cloud.google.com/asset-inventory/docs/quickstart).

## Installing

Install typings for Cloud Asset API:

```
npm install @types/gapi.client.cloudasset-v1p1beta1 --save-dev
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
gapi.client.load('https://cloudasset.googleapis.com/$discovery/rest?version=v1p1beta1', () => {
  // now we can use:
  // gapi.client.cloudasset
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudasset', 'v1p1beta1', () => {
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
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Cloud Asset API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Searches all the IAM policies within a given accessible CRM scope (project/folder/organization). This RPC gives callers especially administrators the ability to search all the IAM policies within a scope, even if they don't have `.getIamPolicy` permission of all the IAM policies. Callers should have `cloud.assets.SearchAllIamPolicies` permission on the requested scope, otherwise the request will be rejected.
*/
await gapi.client.cloudasset.iamPolicies.searchAll({ scope: "scope",  });

/*
Searches all the resources within a given accessible CRM scope (project/folder/organization). This RPC gives callers especially administrators the ability to search all the resources within a scope, even if they don't have `.get` permission of all the resources. Callers should have `cloud.assets.SearchAllResources` permission on the requested scope, otherwise the request will be rejected.
*/
await gapi.client.cloudasset.resources.searchAll({ scope: "scope",  });
```
