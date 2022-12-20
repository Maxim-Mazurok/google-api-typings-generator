# TypeScript typings for Google Ads API v4

Manage your Google Ads accounts, campaigns, and reports with this API.
For detailed description please check [documentation](https://developers.google.com/google-ads/api/).

## Installing

Install typings for Google Ads API:

```
npm install @types/gapi.client.googleads-v4 --save-dev
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
gapi.client.load('https://googleads.googleapis.com/$discovery/rest?version=v4', () => {
  // now we can use:
  // gapi.client.googleads
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('googleads', 'v4', () => {
  // now we can use:
  // gapi.client.googleads
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, create, and delete your Google Ads accounts and data.
      'https://www.googleapis.com/auth/adwords',
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

After that you can use Google Ads API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
