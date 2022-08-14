# TypeScript typings for API Keys API v2

Manages the API keys associated with developer projects.
For detailed description please check [documentation](https://cloud.google.com/api-keys/docs).

## Installing

Install typings for API Keys API:

```
npm install @types/gapi.client.apikeys-v2 --save-dev
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
gapi.client.load('https://apikeys.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.apikeys
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('apikeys', 'v2', () => {
  // now we can use:
  // gapi.client.apikeys
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View your data across Google Cloud services and see the email address of your Google Account
      'https://www.googleapis.com/auth/cloud-platform.read-only',
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

After that you can use API Keys API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Find the parent project and resource name of the API key that matches the key string in the request. If the API key has been purged, resource name will not be set. The service account must have the `apikeys.keys.lookup` permission on the parent project.
*/
await gapi.client.apikeys.keys.lookupKey({  });

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.apikeys.operations.get({ name: "name",  });
```
