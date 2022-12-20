# TypeScript typings for Google Cloud Data Catalog API v1beta1

A fully managed and highly scalable data discovery and metadata management service. 
For detailed description please check [documentation](https://cloud.google.com/data-catalog/docs/).

## Installing

Install typings for Google Cloud Data Catalog API:

```
npm install @types/gapi.client.datacatalog-v1beta1 --save-dev
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
gapi.client.load('https://datacatalog.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.datacatalog
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('datacatalog', 'v1beta1', () => {
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
Searches Data Catalog for multiple resources like entries, tags that match a query. This is a custom method (https://cloud.google.com/apis/design/custom_methods) and does not return the complete resource, only the resource identifier and high level fields. Clients can subsequently call `Get` methods. Note that Data Catalog search queries do not guarantee full recall. Query results that match your query may not be returned, even in subsequent result pages. Also note that results returned (and not returned) can vary across repeated search queries. See [Data Catalog Search Syntax](https://cloud.google.com/data-catalog/docs/how-to/search-reference) for more information.
*/
await gapi.client.datacatalog.catalog.search({  });

/*
Get an entry by target resource name. This method allows clients to use the resource name from the source Google Cloud Platform service to get the Data Catalog Entry.
*/
await gapi.client.datacatalog.entries.lookup({  });
```
