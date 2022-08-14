# TypeScript typings for Stackdriver Profiler API v2

Manages continuous profiling information.
For detailed description please check [documentation](https://cloud.google.com/profiler/).

## Installing

Install typings for Stackdriver Profiler API:

```
npm install @types/gapi.client.cloudprofiler-v2 --save-dev
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
gapi.client.load('https://cloudprofiler.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.cloudprofiler
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudprofiler', 'v2', () => {
  // now we can use:
  // gapi.client.cloudprofiler
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View and write monitoring data for all of your Google and third-party Cloud and API projects
      'https://www.googleapis.com/auth/monitoring',

      // Publish metric data to your Google Cloud projects
      'https://www.googleapis.com/auth/monitoring.write',
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

After that you can use Stackdriver Profiler API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
