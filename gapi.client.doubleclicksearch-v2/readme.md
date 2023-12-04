# TypeScript typings for Search Ads 360 API v2

The Search Ads 360 API allows developers to automate uploading conversions and downloading reports from Search Ads 360.
For detailed description please check [documentation](https://developers.google.com/search-ads).

## Installing

Install typings for Search Ads 360 API:

```
npm install @types/gapi.client.doubleclicksearch-v2 --save-dev
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
  'https://doubleclicksearch.googleapis.com/$discovery/rest?version=v2',
  () => {
    // now we can use:
    // gapi.client.doubleclicksearch
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('doubleclicksearch', 'v2', () => {
  // now we can use:
  // gapi.client.doubleclicksearch
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // View and manage your advertising data in DoubleClick Search
    'https://www.googleapis.com/auth/doubleclicksearch',
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

After that you can use Search Ads 360 API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Retrieves a list of conversions from a DoubleClick Search engine account.
*/
await gapi.client.doubleclicksearch.conversion.get({
  advertiserId: 'advertiserId',
  agencyId: 'agencyId',
  endDate: 1,
  engineAccountId: 'engineAccountId',
  rowCount: 1,
  startDate: 1,
  startRow: 1,
});

/*
Retrieves a list of conversions from a DoubleClick Search engine account.
*/
await gapi.client.doubleclicksearch.conversion.getByCustomerId({
  customerId: 'customerId',
  endDate: 1,
  rowCount: 1,
  startDate: 1,
  startRow: 1,
});

/*
Inserts a batch of new conversions into DoubleClick Search.
*/
await gapi.client.doubleclicksearch.conversion.insert({});

/*
Updates a batch of conversions in DoubleClick Search.
*/
await gapi.client.doubleclicksearch.conversion.update({});

/*
Updates the availabilities of a batch of floodlight activities in DoubleClick Search.
*/
await gapi.client.doubleclicksearch.conversion.updateAvailability({});

/*
Generates and returns a report immediately.
*/
await gapi.client.doubleclicksearch.reports.generate({});

/*
Polls for the status of a report request.
*/
await gapi.client.doubleclicksearch.reports.get({reportId: 'reportId'});

/*
Downloads a report file encoded in UTF-8.
*/
await gapi.client.doubleclicksearch.reports.getFile({
  reportFragment: 1,
  reportId: 'reportId',
});

/*
Downloads a csv file(encoded in UTF-8) that contains ID mappings between legacy SA360 and new SA360. The file includes all children entities of the given advertiser(e.g. engine accounts, campaigns, ad groups, etc.) that exist in both legacy SA360 and new SA360.
*/
await gapi.client.doubleclicksearch.reports.getIdMappingFile({
  advertiserId: 'advertiserId',
  agencyId: 'agencyId',
});

/*
Inserts a report request into the reporting system.
*/
await gapi.client.doubleclicksearch.reports.request({});

/*
Retrieve the list of saved columns for a specified advertiser.
*/
await gapi.client.doubleclicksearch.savedColumns.list({
  advertiserId: 'advertiserId',
  agencyId: 'agencyId',
});
```
