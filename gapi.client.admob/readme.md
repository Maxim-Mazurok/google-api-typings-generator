# TypeScript typings for AdMob API v1

The AdMob API allows publishers to programmatically get information about their AdMob account. 
For detailed description please check [documentation](https://developers.google.com/admob/api/).

## Installing

Install typings for AdMob API:

```
npm install @types/gapi.client.admob@v1 --save-dev
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
gapi.client.load('admob', 'v1', () => {
  // now we can use gapi.client.admob
  // ...
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

After that you can use AdMob API resources:

```typescript

/*
Gets information about the specified AdMob publisher account.
*/
await gapi.client.admob.accounts.get({ name: "name",  });

/*
Lists the AdMob publisher account accessible with the client credential. Currently, all credentials have access to at most one AdMob account.
*/
await gapi.client.admob.accounts.list({  });
```
