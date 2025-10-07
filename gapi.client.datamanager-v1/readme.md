# TypeScript typings for Data Manager API v1

A unified ingestion API for data partners, agencies and advertisers to connect first-party data across Google advertising products.
For detailed description please check [documentation](https://developers.google.com/data-manager).

## Installing

Install typings for Data Manager API:

```
npm install @types/gapi.client.datamanager-v1 --save-dev
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
  'https://datamanager.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.datamanager
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('datamanager', 'v1', () => {
  // now we can use:
  // gapi.client.datamanager
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, create, import, or delete your customer data in Google Ads, Google Marketing Platform (Campaign Manager 360, Search Ads 360, Display & Video 360), and Google Analytics
    'https://www.googleapis.com/auth/datamanager',
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

After that you can use Data Manager API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Uploads a list of AudienceMember resources to the provided Destination.
*/
await gapi.client.datamanager.audienceMembers.ingest({});

/*
Removes a list of AudienceMember resources from the provided Destination.
*/
await gapi.client.datamanager.audienceMembers.remove({});

/*
Uploads a list of Event resources from the provided Destination.
*/
await gapi.client.datamanager.events.ingest({});

/*
Gets the status of a request given request id.
*/
await gapi.client.datamanager.requestStatus.retrieve({});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.datamanager-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
