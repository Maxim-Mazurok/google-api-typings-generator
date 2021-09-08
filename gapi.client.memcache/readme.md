# TypeScript typings for Cloud Memorystore for Memcached API v1

Google Cloud Memorystore for Memcached API is used for creating and managing Memcached instances in GCP.
For detailed description please check [documentation](https://cloud.google.com/memorystore/).

## Installing

Install typings for Cloud Memorystore for Memcached API:

```
npm install @types/gapi.client.memcache@v1 --save-dev
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
gapi.client.load('memcache', 'v1', () => {
  // now we can use gapi.client.memcache
  // ...
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

After that you can use Cloud Memorystore for Memcached API resources:

```typescript
```
