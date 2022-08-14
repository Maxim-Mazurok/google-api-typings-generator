# TypeScript typings for Indexing API v3

Notifies Google when your web pages change.
For detailed description please check [documentation](https://developers.google.com/search/apis/indexing-api/).

## Installing

Install typings for Indexing API:

```
npm install @types/gapi.client.indexing-v3 --save-dev
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
gapi.client.load('https://indexing.googleapis.com/$discovery/rest?version=v3', () => {
  // now we can use:
  // gapi.client.indexing
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('indexing', 'v3', () => {
  // now we can use:
  // gapi.client.indexing
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Submit data to Google for indexing
      'https://www.googleapis.com/auth/indexing',
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

After that you can use Indexing API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets metadata about a Web Document. This method can _only_ be used to query URLs that were previously seen in successful Indexing API notifications. Includes the latest `UrlNotification` received via this API.
*/
await gapi.client.indexing.urlNotifications.getMetadata({  });

/*
Notifies that a URL has been updated or deleted.
*/
await gapi.client.indexing.urlNotifications.publish({  });
```
