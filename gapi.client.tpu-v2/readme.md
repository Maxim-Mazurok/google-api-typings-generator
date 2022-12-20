# TypeScript typings for Cloud TPU API v2

TPU API provides customers with access to Google TPU technology.
For detailed description please check [documentation](https://cloud.google.com/tpu/).

## Installing

Install typings for Cloud TPU API:

```
npm install @types/gapi.client.tpu-v2 --save-dev
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
gapi.client.load('https://tpu.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.tpu
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('tpu', 'v2', () => {
  // now we can use:
  // gapi.client.tpu
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

After that you can use Cloud TPU API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
