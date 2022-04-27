# TypeScript typings for Chrome Verified Access API v2

API for Verified Access chrome extension to provide credential verification for chrome devices connecting to an enterprise network
For detailed description please check [documentation](https://developers.google.com/chrome/verified-access).

## Installing

Install typings for Chrome Verified Access API:

```
npm install @types/gapi.client.verifiedaccess@v2 --save-dev
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
gapi.client.load('verifiedaccess', 'v2', () => {
  // now we can use gapi.client.verifiedaccess
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Verify your enterprise credentials
      'https://www.googleapis.com/auth/verifiedaccess',
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

After that you can use Chrome Verified Access API resources:

```typescript

/*
Generates a new challenge.
*/
await gapi.client.verifiedaccess.challenge.generate({  });

/*
Verifies the challenge response.
*/
await gapi.client.verifiedaccess.challenge.verify({  });
```
