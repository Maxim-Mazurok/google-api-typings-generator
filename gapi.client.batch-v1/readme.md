# TypeScript typings for Batch API v1

An API to manage the running of batch jobs on Google Cloud Platform.
For detailed description please check [documentation](https://cloud.google.com/batch/).

## Installing

Install typings for Batch API:

```
npm install @types/gapi.client.batch-v1 --save-dev
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
gapi.client.load('https://batch.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.batch
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('batch', 'v1', () => {
  // now we can use:
  // gapi.client.batch
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

After that you can use Batch API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
