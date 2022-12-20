# TypeScript typings for BeyondCorp API v1alpha

Beyondcorp Enterprise provides identity and context aware access controls for enterprise resources and enables zero-trust access. Using the Beyondcorp Enterprise APIs, enterprises can set up multi-cloud and on-prem connectivity solutions.
For detailed description please check [documentation](https://cloud.google.com/).

## Installing

Install typings for BeyondCorp API:

```
npm install @types/gapi.client.beyondcorp-v1alpha --save-dev
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
gapi.client.load('https://beyondcorp.googleapis.com/$discovery/rest?version=v1alpha', () => {
  // now we can use:
  // gapi.client.beyondcorp
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('beyondcorp', 'v1alpha', () => {
  // now we can use:
  // gapi.client.beyondcorp
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

After that you can use BeyondCorp API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
