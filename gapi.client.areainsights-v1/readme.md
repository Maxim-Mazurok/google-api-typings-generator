# TypeScript typings for Places Aggregate API v1

Places Aggregate API.
For detailed description please check [documentation](https://g3doc.corp.google.com/geo/platform/area_insights/README.md?cl=head).

## Installing

Install typings for Places Aggregate API:

```
npm install @types/gapi.client.areainsights-v1 --save-dev
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
  'https://areainsights.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.areainsights
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('areainsights', 'v1', () => {
  // now we can use:
  // gapi.client.areainsights
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

After that you can use Places Aggregate API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
This method lets you retrieve insights about areas using a variety of filter such as: area, place type, operating status, price level and ratings. Currently "count" and "places" insights are supported. With "count" insights you can answer questions such as "How many restaurant are located in California that are operational, are inexpensive and have an average rating of at least 4 stars" (see `insight` enum for more details). With "places" insights, you can determine which places match the requested filter. Clients can then use those place resource names to fetch more details about each individual place using the Places API.
*/
await gapi.client.areainsights.computeInsights({});
```
