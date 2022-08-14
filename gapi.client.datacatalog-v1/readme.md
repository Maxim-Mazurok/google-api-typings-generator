# TypeScript typings for Google Cloud Data Catalog API v1

A fully managed and highly scalable data discovery and metadata management service. 
For detailed description please check [documentation](https://cloud.google.com/data-catalog/docs/).

## Installing

Install typings for Google Cloud Data Catalog API:

```
npm install @types/gapi.client.datacatalog-v1 --save-dev
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
gapi.client.load('https://datacatalog.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.datacatalog
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('datacatalog', 'v1', () => {
  // now we can use:
  // gapi.client.datacatalog
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
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Google Cloud Data Catalog API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Searches Data Catalog for multiple resources like entries and tags that match a query. This is a [Custom Method] (https://cloud.google.com/apis/design/custom_methods) that doesn't return all information on a resource, only its ID and high level fields. To get more information, you can subsequently call specific get methods. Note: Data Catalog search queries don't guarantee full recall. Results that match your query might not be returned, even in subsequent result pages. Additionally, returned (and not returned) results can vary if you repeat search queries. For more information, see [Data Catalog search syntax] (https://cloud.google.com/data-catalog/docs/how-to/search-reference).
*/
await gapi.client.datacatalog.catalog.search({  });

/*
Gets an entry by its target resource name. The resource name comes from the source Google Cloud Platform service.
*/
await gapi.client.datacatalog.entries.lookup({  });
```
