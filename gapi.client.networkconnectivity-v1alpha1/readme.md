# TypeScript typings for Network Connectivity API v1alpha1

This API enables connectivity with and between Google Cloud resources.
For detailed description please check [documentation](https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest).

## Installing

Install typings for Network Connectivity API:

```
npm install @types/gapi.client.networkconnectivity-v1alpha1 --save-dev
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
  'https://networkconnectivity.googleapis.com/$discovery/rest?version=v1alpha1',
  () => {
    // now we can use:
    // gapi.client.networkconnectivity
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('networkconnectivity', 'v1alpha1', () => {
  // now we can use:
  // gapi.client.networkconnectivity
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

After that you can use Network Connectivity API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
