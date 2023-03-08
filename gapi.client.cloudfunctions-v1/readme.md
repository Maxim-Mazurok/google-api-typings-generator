# TypeScript typings for Cloud Functions API v1

Manages lightweight user-provided functions executed in response to events.
For detailed description please check [documentation](https://cloud.google.com/functions).

## Installing

Install typings for Cloud Functions API:

```
npm install @types/gapi.client.cloudfunctions-v1 --save-dev
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
gapi.client.load('https://cloudfunctions.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.cloudfunctions
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudfunctions', 'v1', () => {
  // now we can use:
  // gapi.client.cloudfunctions
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

After that you can use Cloud Functions API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.cloudfunctions.operations.get({ name: "name",  });

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
*/
await gapi.client.cloudfunctions.operations.list({  });
```
