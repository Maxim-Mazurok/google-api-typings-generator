# TypeScript typings for Certificate Authority API v1

The Certificate Authority Service API is a highly-available, scalable service that enables you to simplify and automate the management of private certificate authorities (CAs) while staying in control of your private keys. 
For detailed description please check [documentation](https://cloud.google.com/).

## Installing

Install typings for Certificate Authority API:

```
npm install @types/gapi.client.privateca@v1 --save-dev
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
gapi.client.load('privateca', 'v1', () => {
  // now we can use gapi.client.privateca
  // ...
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

After that you can use Certificate Authority API resources:

```typescript
```
