# TypeScript typings for VMware Engine API v1

The Google VMware Engine API lets you programmatically manage VMware environments.
For detailed description please check [documentation](https://cloud.google.com/solutions/vmware-as-a-service).

## Installing

Install typings for VMware Engine API:

```
npm install @types/gapi.client.vmwareengine-v1 --save-dev
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
  'https://vmwareengine.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.vmwareengine
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('vmwareengine', 'v1', () => {
  // now we can use:
  // gapi.client.vmwareengine
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

After that you can use VMware Engine API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.vmwareengine-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
