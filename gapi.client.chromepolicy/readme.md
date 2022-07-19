# TypeScript typings for Chrome Policy API v1

The Chrome Policy API is a suite of services that allows Chrome administrators to control the policies applied to their managed Chrome OS devices and Chrome browsers.
For detailed description please check [documentation](http://developers.google.com/chrome/policy).

## Installing

Install typings for Chrome Policy API:

```
npm install @types/gapi.client.chromepolicy@v1 --save-dev
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
gapi.client.load('chromepolicy', 'v1', () => {
  // now we can use gapi.client.chromepolicy
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // See, edit, create or delete policies applied to Chrome OS and Chrome Browsers managed within your organization
      'https://www.googleapis.com/auth/chrome.management.policy',

      // See policies applied to Chrome OS and Chrome Browsers managed within your organization
      'https://www.googleapis.com/auth/chrome.management.policy.readonly',
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

After that you can use Chrome Policy API resources:

```typescript

/*
Creates an enterprise file from the content provided by user. Returns a public download url for end user.
*/
await gapi.client.chromepolicy.media.upload({ customer: "customer",  });
```
