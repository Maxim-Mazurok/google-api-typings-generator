# TypeScript typings for Backup for GKE API v1

Backup for GKE is a managed Kubernetes workload backup and restore service for GKE clusters.
For detailed description please check [documentation](https://cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke).

## Installing

Install typings for Backup for GKE API:

```
npm install @types/gapi.client.gkebackup@v1 --save-dev
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
gapi.client.load('gkebackup', 'v1', () => {
  // now we can use gapi.client.gkebackup
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

After that you can use Backup for GKE API resources:

```typescript
```
