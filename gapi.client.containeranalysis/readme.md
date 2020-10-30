# TypeScript typings for Container Analysis API v1alpha1

An implementation of the Grafeas API, which stores, and enables querying and retrieval of critical metadata about all of your software artifacts.
For detailed description please check [documentation](https://cloud.google.com/container-analysis/api/reference/rest/).

## Installing

Install typings for Container Analysis API:

```
npm install @types/gapi.client.containeranalysis@v1alpha1 --save-dev
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
gapi.client.load('containeranalysis', 'v1alpha1', () => {
  // now we can use gapi.client.containeranalysis
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

After that you can use Container Analysis API resources:

```typescript
```
