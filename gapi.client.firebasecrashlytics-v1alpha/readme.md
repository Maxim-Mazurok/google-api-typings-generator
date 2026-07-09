# TypeScript typings for Firebase Crashlytics API v1alpha

This service provides an API for mobile app developers to request deletion of user's crash reports.
For detailed description please check [documentation](https://firebase.google.com/docs/crashlytics).

## Installing

Install typings for Firebase Crashlytics API:

```
npm install @types/gapi.client.firebasecrashlytics-v1alpha --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "gapi",
      "gapi.auth2",
      "gapi.client",
      "gapi.client.firebasecrashlytics-v1alpha"
    ]
  }
}
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
  'https://firebasecrashlytics.googleapis.com/$discovery/rest?version=v1alpha',
  () => {
    // now we can use:
    // gapi.client.firebasecrashlytics
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('firebasecrashlytics', 'v1alpha', () => {
  // now we can use:
  // gapi.client.firebasecrashlytics
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

After that you can use Firebase Crashlytics API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.firebasecrashlytics-v1alpha#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
