# TypeScript typings for Firebase Realtime Database Management API v1beta

The Firebase Realtime Database Management API enables programmatic provisioning and management of Realtime Database instances.
For detailed description please check [documentation](https://firebase.google.com/docs/reference/rest/database/database-management/rest/).

## Installing

Install typings for Firebase Realtime Database Management API:

```
npm install @types/gapi.client.firebasedatabase-v1beta --save-dev
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
gapi.client.load('https://firebasedatabase.googleapis.com/$discovery/rest?version=v1beta', () => {
  // now we can use:
  // gapi.client.firebasedatabase
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('firebasedatabase', 'v1beta', () => {
  // now we can use:
  // gapi.client.firebasedatabase
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

      // View and administer all your Firebase data and settings
      'https://www.googleapis.com/auth/firebase',

      // View all your Firebase data and settings
      'https://www.googleapis.com/auth/firebase.readonly',
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

After that you can use Firebase Realtime Database Management API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
