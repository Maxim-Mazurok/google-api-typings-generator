# TypeScript typings for Google OAuth2 API v2

Obtains end-user authorization grants for use with other Google APIs.
For detailed description please check [documentation](https://developers.google.com/identity/protocols/oauth2/).

## Installing

Install typings for Google OAuth2 API:

```
npm install @types/gapi.client.oauth2-v2 --save-dev
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
gapi.client.load('https://www.googleapis.com/discovery/v1/apis/oauth2/v2/rest', () => {
  // now we can use:
  // gapi.client.oauth2
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('oauth2', 'v2', () => {
  // now we can use:
  // gapi.client.oauth2
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // View your email address
      'https://www.googleapis.com/auth/userinfo.email',

      // See your personal info, including any personal info you've made publicly available
      'https://www.googleapis.com/auth/userinfo.profile',

      // Associate you with your personal info on Google
      'openid',
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

After that you can use Google OAuth2 API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
undefined
*/
await gapi.client.oauth2.userinfo.get({  });
```
