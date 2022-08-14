# TypeScript typings for Cloud Pub/Sub API v1beta2

Provides reliable, many-to-many, asynchronous messaging between applications. 
For detailed description please check [documentation](https://cloud.google.com/pubsub/docs).

## Installing

Install typings for Cloud Pub/Sub API:

```
npm install @types/gapi.client.pubsub-v1beta2 --save-dev
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
gapi.client.load('https://pubsub.googleapis.com/$discovery/rest?version=v1beta2', () => {
  // now we can use:
  // gapi.client.pubsub
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('pubsub', 'v1beta2', () => {
  // now we can use:
  // gapi.client.pubsub
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View and manage Pub/Sub topics and subscriptions
      'https://www.googleapis.com/auth/pubsub',
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

After that you can use Cloud Pub/Sub API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
