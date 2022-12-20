# TypeScript typings for Cloud Runtime Configuration API v1beta1

The Runtime Configurator allows you to dynamically configure and expose variables through Google Cloud Platform. In addition, you can also set Watchers and Waiters that will watch for changes to your data and return based on certain conditions.
For detailed description please check [documentation](https://cloud.google.com/deployment-manager/runtime-configurator/).

## Installing

Install typings for Cloud Runtime Configuration API:

```
npm install @types/gapi.client.runtimeconfig-v1beta1 --save-dev
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
gapi.client.load('https://runtimeconfig.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.runtimeconfig
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('runtimeconfig', 'v1beta1', () => {
  // now we can use:
  // gapi.client.runtimeconfig
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // Manage your Google Cloud Platform services' runtime configuration
      'https://www.googleapis.com/auth/cloudruntimeconfig',
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

After that you can use Cloud Runtime Configuration API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
