# TypeScript typings for Google Workspace Marketplace API v2

Lets your Google Workspace Marketplace applications integrate with Google's installtion and licensing services.
For detailed description please check [documentation](https://developers.google.com/workspace/marketplace).

## Installing

Install typings for Google Workspace Marketplace API:

```
npm install @types/gapi.client.appsmarket-v2 --save-dev
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
  'https://appsmarket.googleapis.com/$discovery/rest?version=v2',
  () => {
    // now we can use:
    // gapi.client.appsmarket
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('appsmarket', 'v2', () => {
  // now we can use:
  // gapi.client.appsmarket
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // View your installed application's licensing information
    'https://www.googleapis.com/auth/appsmarketplace.license',
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

After that you can use Google Workspace Marketplace API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets the customer's licensing status to determine if they have access to a given app. For more information, see [Getting app installation and licensing details](https://developers.google.com/workspace/marketplace/example-calls-marketplace-api).
*/
await gapi.client.appsmarket.customerLicense.get({
  applicationId: 'applicationId',
  customerId: 'customerId',
});

/*
Gets the user's licensing status to determine if they have permission to use a given app. For more information, see [Getting app installation and licensing details](https://developers.google.com/workspace/marketplace/example-calls-marketplace-api).
*/
await gapi.client.appsmarket.userLicense.get({
  applicationId: 'applicationId',
  userId: 'userId',
});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.appsmarket-v2#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
