# TypeScript typings for Firebase App Distribution API v1


For detailed description please check [documentation](https://firebase.google.com/products/app-distribution).

## Installing

Install typings for Firebase App Distribution API:

```
npm install @types/gapi.client.firebaseappdistribution-v1 --save-dev
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
gapi.client.load('https://firebaseappdistribution.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.firebaseappdistribution
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('firebaseappdistribution', 'v1', () => {
  // now we can use:
  // gapi.client.firebaseappdistribution
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

After that you can use Firebase App Distribution API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Uploads a binary. Uploading a binary can result in a new release being created, an update to an existing release, or a no-op if a release with the same binary already exists.
*/
await gapi.client.firebaseappdistribution.media.upload({ app: "app",  });
```
