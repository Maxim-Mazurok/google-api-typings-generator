# TypeScript typings for Firebase App Hosting API v1beta

Firebase App Hosting streamlines the development and deployment of dynamic Next.js and Angular applications, offering built-in framework support, GitHub integration, and integration with other Firebase products. You can use this API to intervene in the Firebase App Hosting build process and add custom functionality not supported in our default Console & CLI flows, including triggering builds from external CI/CD workflows or deploying from pre-built container images.
For detailed description please check [documentation](https://firebase.google.com/docs/app-hosting).

## Installing

Install typings for Firebase App Hosting API:

```
npm install @types/gapi.client.firebaseapphosting-v1beta --save-dev
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
  'https://firebaseapphosting.googleapis.com/$discovery/rest?version=v1beta',
  () => {
    // now we can use:
    // gapi.client.firebaseapphosting
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('firebaseapphosting', 'v1beta', () => {
  // now we can use:
  // gapi.client.firebaseapphosting
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

After that you can use Firebase App Hosting API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
