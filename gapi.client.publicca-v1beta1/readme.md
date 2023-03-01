# TypeScript typings for Public Certificate Authority API v1beta1

The Public Certificate Authority API may be used to create and manage ACME external account binding keys associated with Google Trust Services' publicly trusted certificate authority. 
For detailed description please check [documentation](https://cloud.google.com/public-certificate-authority/docs).

## Installing

Install typings for Public Certificate Authority API:

```
npm install @types/gapi.client.publicca-v1beta1 --save-dev
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
gapi.client.load('https://publicca.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.publicca
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('publicca', 'v1beta1', () => {
  // now we can use:
  // gapi.client.publicca
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

After that you can use Public Certificate Authority API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
