# TypeScript typings for Bare Metal Solution API v2

Provides ways to manage Bare Metal Solution hardware installed in a regional extension located near a Google Cloud data center.
For detailed description please check [documentation](https://cloud.google.com/bare-metal).

## Installing

Install typings for Bare Metal Solution API:

```
npm install @types/gapi.client.baremetalsolution-v2 --save-dev
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
gapi.client.load('https://baremetalsolution.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.baremetalsolution
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('baremetalsolution', 'v2', () => {
  // now we can use:
  // gapi.client.baremetalsolution
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

After that you can use Bare Metal Solution API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
