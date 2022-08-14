# TypeScript typings for Traffic Director API v2


For detailed description please check [documentation](https://cloud.google.com/traffic-director).

## Installing

Install typings for Traffic Director API:

```
npm install @types/gapi.client.trafficdirector-v2 --save-dev
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
gapi.client.load('https://trafficdirector.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.trafficdirector
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('trafficdirector', 'v2', () => {
  // now we can use:
  // gapi.client.trafficdirector
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

After that you can use Traffic Director API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*

*/
await gapi.client.trafficdirector.discovery.client_status({  });
```
