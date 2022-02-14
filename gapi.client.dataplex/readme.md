# TypeScript typings for Cloud Dataplex API v1

Dataplex API is used to manage the lifecycle of data lakes.
For detailed description please check [documentation](https://cloud.google.com/dataplex/docs).

## Installing

Install typings for Cloud Dataplex API:

```
npm install @types/gapi.client.dataplex@v1 --save-dev
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
gapi.client.load('dataplex', 'v1', () => {
  // now we can use gapi.client.dataplex
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

After that you can use Cloud Dataplex API resources:

```typescript
```
