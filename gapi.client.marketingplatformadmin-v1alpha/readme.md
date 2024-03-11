# TypeScript typings for Google Marketing Platform Admin API v1alpha

The Google Marketing Platform Admin API allows for programmatic access to the Google Marketing Platform configuration data. You can use the Google Marketing Platform Admin API to manage links between your Google Marketing Platform organization and Google Analytics accounts, set the service level of your GA4 properties.
For detailed description please check [documentation](https://developers.google.com/analytics/devguides/config/gmp/v1).

## Installing

Install typings for Google Marketing Platform Admin API:

```
npm install @types/gapi.client.marketingplatformadmin-v1alpha --save-dev
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
  'https://marketingplatformadmin.googleapis.com/$discovery/rest?version=v1alpha',
  () => {
    // now we can use:
    // gapi.client.marketingplatformadmin
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('marketingplatformadmin', 'v1alpha', () => {
  // now we can use:
  // gapi.client.marketingplatformadmin
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // View your Google Analytics product account data in GMP home
    'https://www.googleapis.com/auth/marketingplatformadmin.analytics.read',

    // Manage your Google Analytics product account data in GMP home
    'https://www.googleapis.com/auth/marketingplatformadmin.analytics.update',
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

After that you can use Google Marketing Platform Admin API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```
