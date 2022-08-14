# TypeScript typings for Local Services API v1


For detailed description please check [documentation](https://ads.google.com/local-services-ads/).

## Installing

Install typings for Local Services API:

```
npm install @types/gapi.client.localservices-v1 --save-dev
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
gapi.client.load('https://localservices.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.localservices
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('localservices', 'v1', () => {
  // now we can use:
  // gapi.client.localservices
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, create, and delete your Google Ads accounts and data.
      'https://www.googleapis.com/auth/adwords',
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

After that you can use Local Services API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Get account reports containing aggregate account data of all linked GLS accounts. Caller needs to provide their manager customer id and the associated auth credential that allows them read permissions on their linked accounts.
*/
await gapi.client.localservices.accountReports.search({  });

/*
Get detailed lead reports containing leads that have been received by all linked GLS accounts. Caller needs to provide their manager customer id and the associated auth credential that allows them read permissions on their linked accounts.
*/
await gapi.client.localservices.detailedLeadReports.search({  });
```
