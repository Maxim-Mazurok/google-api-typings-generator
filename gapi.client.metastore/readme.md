# TypeScript typings for Dataproc Metastore API v1beta

The Dataproc Metastore API is used to manage the lifecycle and configuration of metastore services.
For detailed description please check [documentation](https://cloud.google.com/dataproc-metastore/docs).

## Installing

Install typings for Dataproc Metastore API:

```
npm install @types/gapi.client.metastore@v1beta --save-dev
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
gapi.client.load('metastore', 'v1beta', () => {
  // now we can use gapi.client.metastore
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

After that you can use Dataproc Metastore API resources:

```typescript
```
