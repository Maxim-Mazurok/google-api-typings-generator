# TypeScript typings for Cloud Controls Partner API v1beta

Provides insights about your customers and their Assured Workloads based on your Sovereign Controls by Partners offering.
For detailed description please check [documentation](https://cloud.google.com/sovereign-controls-by-partners/docs/sovereign-partners/reference/rest).

## Installing

Install typings for Cloud Controls Partner API:

```
npm install @types/gapi.client.cloudcontrolspartner-v1beta --save-dev
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
  'https://cloudcontrolspartner.googleapis.com/$discovery/rest?version=v1beta',
  () => {
    // now we can use:
    // gapi.client.cloudcontrolspartner
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudcontrolspartner', 'v1beta', () => {
  // now we can use:
  // gapi.client.cloudcontrolspartner
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

After that you can use Cloud Controls Partner API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
