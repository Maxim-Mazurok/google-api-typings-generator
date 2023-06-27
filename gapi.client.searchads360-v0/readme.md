# TypeScript typings for Search Ads 360 Reporting API v0

The Search Ads 360 API allows developers to automate downloading reports from Search Ads 360.
For detailed description please check [documentation](https://developers.google.com/search-ads/reporting).

## Installing

Install typings for Search Ads 360 Reporting API:

```
npm install @types/gapi.client.searchads360-v0 --save-dev
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
gapi.client.load('https://searchads360.googleapis.com/$discovery/rest?version=v0', () => {
  // now we can use:
  // gapi.client.searchads360
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('searchads360', 'v0', () => {
  // now we can use:
  // gapi.client.searchads360
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
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Search Ads 360 Reporting API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Returns resource names of customers directly accessible by the user authenticating the call. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.listAccessibleCustomers({  });

/*
Returns just the requested field. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.searchAds360Fields.get({ resourceName: "resourceName",  });

/*
Returns all fields that match the search query. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QueryError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.searchAds360Fields.search({  });
```
