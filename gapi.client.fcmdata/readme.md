# TypeScript typings for Firebase Cloud Messaging Data API v1beta1

Provides additional information about Firebase Cloud Messaging (FCM) message sends and deliveries.
For detailed description please check [documentation](https://firebase.google.com/docs/cloud-messaging).

## Installing

Install typings for Firebase Cloud Messaging Data API:

```
npm install @types/gapi.client.fcmdata@v1beta1 --save-dev
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
gapi.client.load('fcmdata', 'v1beta1', () => {
  // now we can use gapi.client.fcmdata
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // See, edit, configure, and delete your Google Cloud Platform data
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

After that you can use Firebase Cloud Messaging Data API resources:

```typescript
```
