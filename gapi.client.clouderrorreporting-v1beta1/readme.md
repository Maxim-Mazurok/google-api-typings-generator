# TypeScript typings for Error Reporting API v1beta1

Groups and counts similar errors from cloud services and applications, reports new errors, and provides access to error groups and their associated errors. 
For detailed description please check [documentation](https://cloud.google.com/error-reporting/).

## Installing

Install typings for Error Reporting API:

```
npm install @types/gapi.client.clouderrorreporting-v1beta1 --save-dev
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
gapi.client.load('https://clouderrorreporting.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.clouderrorreporting
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('clouderrorreporting', 'v1beta1', () => {
  // now we can use:
  // gapi.client.clouderrorreporting
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

After that you can use Error Reporting API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Deletes all error events of a given project.
*/
await gapi.client.clouderrorreporting.projects.deleteEvents({ projectName: "projectName",  });
```
