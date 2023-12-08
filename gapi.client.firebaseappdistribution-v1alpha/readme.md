# TypeScript typings for Firebase App Distribution API v1alpha

For detailed description please check [documentation](https://firebase.google.com/products/app-distribution).

## Installing

Install typings for Firebase App Distribution API:

```
npm install @types/gapi.client.firebaseappdistribution-v1alpha --save-dev
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
  'https://firebaseappdistribution.googleapis.com/$discovery/rest?version=v1alpha',
  () => {
    // now we can use:
    // gapi.client.firebaseappdistribution
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('firebaseappdistribution', 'v1alpha', () => {
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

After that you can use Firebase App Distribution API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Get the app, if it exists
*/
await gapi.client.firebaseappdistribution.apps.get({
  mobilesdkAppId: 'mobilesdkAppId',
});

/*
Get a JWT token
*/
await gapi.client.firebaseappdistribution.apps.getJwt({
  mobilesdkAppId: 'mobilesdkAppId',
});

/*
Provision app distribution for an existing Firebase app, enabling it to subsequently be used by appdistro.
*/
await gapi.client.firebaseappdistribution.apps.provisionApp({
  mobilesdkAppId: 'mobilesdkAppId',
});
```
