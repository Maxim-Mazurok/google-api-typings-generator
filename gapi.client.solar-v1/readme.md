# TypeScript typings for Solar API v1

Solar API.
For detailed description please check [documentation](https://developers.google.com/maps/documentation/solar).

## Installing

Install typings for Solar API:

```
npm install @types/gapi.client.solar-v1 --save-dev
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
  'https://solar.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.solar
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('solar', 'v1', () => {
  // now we can use:
  // gapi.client.solar
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

After that you can use Solar API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Locates the closest building to a query point. Returns an error with code `NOT_FOUND` if there are no buildings within approximately 50m of the query point.
*/
await gapi.client.solar.buildingInsights.findClosest({});

/*
Gets solar information for a region surrounding a location. Returns an error with code `NOT_FOUND` if the location is outside the coverage area.
*/
await gapi.client.solar.dataLayers.get({});

/*
Returns an image by its ID.
*/
await gapi.client.solar.geoTiff.get({});
```
