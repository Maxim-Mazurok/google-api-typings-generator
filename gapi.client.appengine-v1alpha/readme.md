# TypeScript typings for App Engine Admin API v1alpha

Provisions and manages developers' App Engine applications.
For detailed description please check [documentation](https://cloud.google.com/appengine/docs/admin-api/).

## Installing

Install typings for App Engine Admin API:

```
npm install @types/gapi.client.appengine-v1alpha --save-dev
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
gapi.client.load('https://appengine.googleapis.com/$discovery/rest?version=v1alpha', () => {
  // now we can use:
  // gapi.client.appengine
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('appengine', 'v1alpha', () => {
  // now we can use:
  // gapi.client.appengine
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // View and manage your applications deployed on Google App Engine
      'https://www.googleapis.com/auth/appengine.admin',

      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View your data across Google Cloud services and see the email address of your Google Account
      'https://www.googleapis.com/auth/cloud-platform.read-only',
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

After that you can use App Engine Admin API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
