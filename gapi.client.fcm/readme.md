# TypeScript typings for Firebase Cloud Messaging API v1

FCM send API that provides a cross-platform messaging solution to reliably deliver messages at no cost.
For detailed description please check [documentation](https://firebase.google.com/docs/cloud-messaging).

## Installing

Install typings for Firebase Cloud Messaging API:

```
npm install @types/gapi.client.fcm@v1 --save-dev
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
gapi.client.load('fcm', 'v1', () => {
  // now we can use gapi.client.fcm
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your data across Google Cloud Platform services
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

After that you can use Firebase Cloud Messaging API resources:

```typescript
```
