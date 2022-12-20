# TypeScript typings for Connectors API v2

Enables users to create and manage connections to Google Cloud services and third-party business applications using the Connectors interface.
For detailed description please check [documentation](https://cloud.google.com/apigee/docs/api-platform/connectors/about-connectors).

## Installing

Install typings for Connectors API:

```
npm install @types/gapi.client.connectors-v2 --save-dev
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
gapi.client.load('https://connectors.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.connectors
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('connectors', 'v2', () => {
  // now we can use:
  // gapi.client.connectors
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

After that you can use Connectors API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
