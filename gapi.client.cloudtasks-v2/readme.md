# TypeScript typings for Cloud Tasks API v2

Manages the execution of large numbers of distributed requests.
For detailed description please check [documentation](https://cloud.google.com/tasks/).

## Installing

Install typings for Cloud Tasks API:

```
npm install @types/gapi.client.cloudtasks-v2 --save-dev
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
gapi.client.load('https://cloudtasks.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.cloudtasks
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudtasks', 'v2', () => {
  // now we can use:
  // gapi.client.cloudtasks
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

After that you can use Cloud Tasks API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
