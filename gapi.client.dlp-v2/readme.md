# TypeScript typings for Sensitive Data Protection (DLP) v2

Discover and protect your sensitive data. A fully managed service designed to help you discover, classify, and protect your valuable data assets with ease.
For detailed description please check [documentation](https://cloud.google.com/dlp/docs/).

## Installing

Install typings for Sensitive Data Protection (DLP):

```
npm install @types/gapi.client.dlp-v2 --save-dev
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
  'https://dlp.googleapis.com/$discovery/rest?version=v2',
  () => {
    // now we can use:
    // gapi.client.dlp
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('dlp', 'v2', () => {
  // now we can use:
  // gapi.client.dlp
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
  }
);
```

After that you can use Sensitive Data Protection (DLP) resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Returns a list of the sensitive information types that DLP API supports. See https://cloud.google.com/dlp/docs/infotypes-reference to learn more.
*/
await gapi.client.dlp.infoTypes.list({});
```
