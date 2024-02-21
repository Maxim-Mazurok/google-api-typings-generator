# TypeScript typings for Places API (New) v1

For detailed description please check [documentation](https://mapsplatform.google.com/maps-products/#places-section).

## Installing

Install typings for Places API (New):

```
npm install @types/gapi.client.places-v1 --save-dev
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
  'https://places.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.places
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('places', 'v1', () => {
  // now we can use:
  // gapi.client.places
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // Private Service: https://www.googleapis.com/auth/maps-platform.places
    'https://www.googleapis.com/auth/maps-platform.places',

    // Private Service: https://www.googleapis.com/auth/maps-platform.places.autocomplete
    'https://www.googleapis.com/auth/maps-platform.places.autocomplete',

    // Private Service: https://www.googleapis.com/auth/maps-platform.places.details
    'https://www.googleapis.com/auth/maps-platform.places.details',

    // Private Service: https://www.googleapis.com/auth/maps-platform.places.nearbysearch
    'https://www.googleapis.com/auth/maps-platform.places.nearbysearch',

    // Private Service: https://www.googleapis.com/auth/maps-platform.places.textsearch
    'https://www.googleapis.com/auth/maps-platform.places.textsearch',
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

After that you can use Places API (New) resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Returns predictions for the given input.
*/
await gapi.client.places.places.autocomplete({});

/*
Get the details of a place based on its resource name, which is a string in the `places/{place_id}` format.
*/
await gapi.client.places.places.get({name: 'name'});

/*
Search for places near locations.
*/
await gapi.client.places.places.searchNearby({});

/*
Text query based place search.
*/
await gapi.client.places.places.searchText({});
```
