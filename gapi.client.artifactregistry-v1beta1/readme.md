# TypeScript typings for Artifact Registry API v1beta1

Store and manage build artifacts in a scalable and integrated service built on Google infrastructure.
For detailed description please check [documentation](https://cloud.google.com/artifacts/docs/).

## Installing

Install typings for Artifact Registry API:

```
npm install @types/gapi.client.artifactregistry-v1beta1 --save-dev
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
gapi.client.load('https://artifactregistry.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.artifactregistry
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('artifactregistry', 'v1beta1', () => {
  // now we can use:
  // gapi.client.artifactregistry
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

After that you can use Artifact Registry API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
