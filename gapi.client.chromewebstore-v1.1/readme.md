# TypeScript typings for Chrome Web Store API v1.1

The Chrome Web Store API provides access to data about apps and extensions, as well as developer tools for managing them.
For detailed description please check [documentation](https://developer.chrome.com/docs/webstore/api).

## Installing

Install typings for Chrome Web Store API:

```
npm install @types/gapi.client.chromewebstore-v1.1 --save-dev
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
  'https://chromewebstore.googleapis.com/$discovery/rest?version=v1.1',
  () => {
    // now we can use:
    // gapi.client.chromewebstore
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('chromewebstore', 'v1.1', () => {
  // now we can use:
  // gapi.client.chromewebstore
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, update, or publish your Chrome Web Store extensions, themes, apps, and licences you have access to
    'https://www.googleapis.com/auth/chromewebstore',

    // See and download your Chrome Web Store extensions and apps, and see licenses you have access to
    'https://www.googleapis.com/auth/chromewebstore.readonly',
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

After that you can use Chrome Web Store API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets your own Chrome Web Store item.
*/
await gapi.client.chromewebstore.items.get({itemId: 'itemId'});

/*
Inserts a new item.
*/
await gapi.client.chromewebstore.items.insert({});

/*
Publishes an item.
*/
await gapi.client.chromewebstore.items.publish({itemId: 'itemId'});

/*
Updates an existing item.
*/
await gapi.client.chromewebstore.items.update({itemId: 'itemId'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.chromewebstore-v1.1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
