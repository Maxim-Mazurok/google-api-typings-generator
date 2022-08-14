# TypeScript typings for Cloud Life Sciences API v2beta

Cloud Life Sciences is a suite of services and tools for managing, processing, and transforming life sciences data.
For detailed description please check [documentation](https://cloud.google.com/life-sciences).

## Installing

Install typings for Cloud Life Sciences API:

```
npm install @types/gapi.client.lifesciences-v2beta --save-dev
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
gapi.client.load('https://lifesciences.googleapis.com/$discovery/rest?version=v2beta', () => {
  // now we can use:
  // gapi.client.lifesciences
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('lifesciences', 'v2beta', () => {
  // now we can use:
  // gapi.client.lifesciences
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

After that you can use Cloud Life Sciences API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
