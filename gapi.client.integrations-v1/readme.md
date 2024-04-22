# TypeScript typings for Application Integration API v1

For detailed description please check [documentation](https://cloud.google.com/application-integration).

## Installing

Install typings for Application Integration API:

```
npm install @types/gapi.client.integrations-v1 --save-dev
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
  'https://integrations.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.integrations
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('integrations', 'v1', () => {
  // now we can use:
  // gapi.client.integrations
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

After that you can use Application Integration API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Receives the auth code and auth config id to combine that with the client id and secret to retrieve access tokens from the token endpoint. Returns either a success or error message when it's done.
*/
await gapi.client.integrations.callback.generateToken({});

/*
Enumerates the regions for which Connector Platform is provisioned.
*/
await gapi.client.integrations.connectorPlatformRegions.enumerate({});

/*
Gets the metadata info for the requested client
*/
await gapi.client.integrations.projects.getClientmetadata({parent: 'parent'});
```
