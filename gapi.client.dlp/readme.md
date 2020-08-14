# TypeScript typings for Cloud Data Loss Prevention (DLP) API v2

Provides methods for detection, risk analysis, and de-identification of privacy-sensitive fragments in text, images, and Google Cloud Platform storage repositories.
For detailed description please check [documentation](https://cloud.google.com/dlp/docs/).

## Installing

Install typings for Cloud Data Loss Prevention (DLP) API:

```
npm install @types/gapi.client.dlp@v2 --save-dev
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
gapi.client.load('dlp', 'v2', () => {
  // now we can use gapi.client.dlp
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

After that you can use Cloud Data Loss Prevention (DLP) API resources:

```typescript

/*
Returns a list of the sensitive information types that the DLP API supports. See https://cloud.google.com/dlp/docs/infotypes-reference to learn more.
*/
await gapi.client.dlp.infoTypes.list({  });
```
