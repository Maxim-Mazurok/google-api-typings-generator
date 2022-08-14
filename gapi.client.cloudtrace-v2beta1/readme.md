# TypeScript typings for Cloud Trace API v2beta1

Sends application trace data to Cloud Trace for viewing. Trace data is collected for all App Engine applications by default. Trace data from other applications can be provided using this API. This library is used to interact with the Cloud Trace API directly. If you are looking to instrument your application for Cloud Trace, we recommend using OpenTelemetry. 
For detailed description please check [documentation](https://cloud.google.com/trace).

## Installing

Install typings for Cloud Trace API:

```
npm install @types/gapi.client.cloudtrace-v2beta1 --save-dev
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
gapi.client.load('https://cloudtrace.googleapis.com/$discovery/rest?version=v2beta1', () => {
  // now we can use:
  // gapi.client.cloudtrace
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudtrace', 'v2beta1', () => {
  // now we can use:
  // gapi.client.cloudtrace
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // Write Trace data for a project or application
      'https://www.googleapis.com/auth/trace.append',

      // Read Trace data for a project or application
      'https://www.googleapis.com/auth/trace.readonly',
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

After that you can use Cloud Trace API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
