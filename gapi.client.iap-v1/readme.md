# TypeScript typings for Cloud Identity-Aware Proxy API v1

Controls access to cloud applications running on Google Cloud Platform.
For detailed description please check [documentation](https://cloud.google.com/iap).

## Installing

Install typings for Cloud Identity-Aware Proxy API:

```
npm install @types/gapi.client.iap-v1 --save-dev
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
gapi.client.load('https://iap.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.iap
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('iap', 'v1', () => {
  // now we can use:
  // gapi.client.iap
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

After that you can use Cloud Identity-Aware Proxy API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets the access control policy for an Identity-Aware Proxy protected resource. More information about managing access via IAP can be found at: https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api
*/
await gapi.client.iap.getIamPolicy({ resource: "resource",  });

/*
Gets the IAP settings on a particular IAP protected resource.
*/
await gapi.client.iap.getIapSettings({ name: "name",  });

/*
Sets the access control policy for an Identity-Aware Proxy protected resource. Replaces any existing policy. More information about managing access via IAP can be found at: https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api
*/
await gapi.client.iap.setIamPolicy({ resource: "resource",  });

/*
Returns permissions that a caller has on the Identity-Aware Proxy protected resource. More information about managing access via IAP can be found at: https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api
*/
await gapi.client.iap.testIamPermissions({ resource: "resource",  });

/*
Updates the IAP settings on a particular IAP protected resource. It replaces all fields unless the `update_mask` is set.
*/
await gapi.client.iap.updateIapSettings({ name: "name",  });
```
