# TypeScript typings for AdMob API v1

The AdMob API allows publishers to programmatically get information about their AdMob account. 
For detailed description please check [documentation](https://developers.google.com/admob/api/).

## Installing

Install typings for AdMob API:

```
npm install @types/gapi.client.admob-v1 --save-dev
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
gapi.client.load('https://admob.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.admob
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('admob', 'v1', () => {
  // now we can use:
  // gapi.client.admob
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See your AdMob data
      'https://www.googleapis.com/auth/admob.readonly',

      // See your AdMob data
      'https://www.googleapis.com/auth/admob.report',
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

After that you can use AdMob API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets information about the specified AdMob publisher account.
*/
await gapi.client.admob.accounts.get({ name: "name",  });

/*
Lists the AdMob publisher account that was most recently signed in to from the AdMob UI. For more information, see https://support.google.com/admob/answer/10243672.
*/
await gapi.client.admob.accounts.list({  });
```
