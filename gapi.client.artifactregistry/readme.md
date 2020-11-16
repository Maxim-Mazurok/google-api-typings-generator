# TypeScript typings for Artifact Registry API v1beta2

Store and manage build artifacts in a scalable and integrated service built on Google infrastructure.
For detailed description please check [documentation](https://cloud.google.com/artifacts/docs/).

## Installing

Install typings for Artifact Registry API:

```
npm install @types/gapi.client.artifactregistry@v1beta2 --save-dev
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
gapi.client.load('artifactregistry', 'v1beta2', () => {
  // now we can use gapi.client.artifactregistry
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your data across Google Cloud Platform services
      'https://www.googleapis.com/auth/cloud-platform',

      // View your data across Google Cloud Platform services
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

After that you can use Artifact Registry API resources:

```typescript
```
