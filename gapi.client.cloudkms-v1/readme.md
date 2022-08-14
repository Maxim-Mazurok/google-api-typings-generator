# TypeScript typings for Cloud Key Management Service (KMS) API v1

Manages keys and performs cryptographic operations in a central cloud service, for direct use by other cloud resources and applications. 
For detailed description please check [documentation](https://cloud.google.com/kms/).

## Installing

Install typings for Cloud Key Management Service (KMS) API:

```
npm install @types/gapi.client.cloudkms-v1 --save-dev
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
gapi.client.load('https://cloudkms.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.cloudkms
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudkms', 'v1', () => {
  // now we can use:
  // gapi.client.cloudkms
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View and manage your keys and secrets stored in Cloud Key Management Service
      'https://www.googleapis.com/auth/cloudkms',
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

After that you can use Cloud Key Management Service (KMS) API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
```
