# TypeScript typings for Cloud Storage for Firebase API v1beta

The Cloud Storage for Firebase API enables programmatic management of Cloud Storage buckets for use in Firebase projects
For detailed description please check [documentation](https://firebase.google.com/docs/storage).

## Installing

Install typings for Cloud Storage for Firebase API:

```
npm install @types/gapi.client.firebasestorage-v1beta --save-dev
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
gapi.client.load('https://firebasestorage.googleapis.com/$discovery/rest?version=v1beta', () => {
  // now we can use:
  // gapi.client.firebasestorage
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('firebasestorage', 'v1beta', () => {
  // now we can use:
  // gapi.client.firebasestorage
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View and administer all your Firebase data and settings
      'https://www.googleapis.com/auth/firebase',
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

After that you can use Cloud Storage for Firebase API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
