# TypeScript typings for Bare Metal Solution API v1

Bare Metal Solution provides hardware to run specialized workloads with low latency on Google Cloud.
For detailed description please check [documentation](https://cloud.google.com/bare-metal).

## Installing

Install typings for Bare Metal Solution API:

```
npm install @types/gapi.client.baremetalsolution@v1 --save-dev
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
gapi.client.load('baremetalsolution', 'v1', () => {
  // now we can use gapi.client.baremetalsolution
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

After that you can use Bare Metal Solution API resources:

```typescript
```
