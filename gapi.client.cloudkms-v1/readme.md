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
gapi.client.load(
  'https://cloudkms.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.cloudkms
  },
);
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
  {client_id: client_id, scope: scope, immediate: immediate},
  authResult => {
    if (authResult && !authResult.error) {
      /* handle successful authorization */
    } else {
      /* handle authorization error */
    }
  },
);
```

After that you can use Cloud Key Management Service (KMS) API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Returns the AutokeyConfig for a folder.
*/
await gapi.client.cloudkms.folders.getAutokeyConfig({name: 'name'});

/*
Gets the KeyAccessJustificationsPolicyConfig for a given organization/folder/projects.
*/
await gapi.client.cloudkms.folders.getKajPolicyConfig({name: 'name'});

/*
Updates the AutokeyConfig for a folder. The caller must have both `cloudkms.autokeyConfigs.update` permission on the parent folder and `cloudkms.cryptoKeys.setIamPolicy` permission on the provided key project. A KeyHandle creation in the folder's descendant projects will use this configuration to determine where to create the resulting CryptoKey.
*/
await gapi.client.cloudkms.folders.updateAutokeyConfig({name: 'name'});

/*
Updates the KeyAccessJustificationsPolicyConfig for a given organization/folder/projects.
*/
await gapi.client.cloudkms.folders.updateKajPolicyConfig({name: 'name'});

/*
Gets the KeyAccessJustificationsPolicyConfig for a given organization/folder/projects.
*/
await gapi.client.cloudkms.organizations.getKajPolicyConfig({name: 'name'});

/*
Updates the KeyAccessJustificationsPolicyConfig for a given organization/folder/projects.
*/
await gapi.client.cloudkms.organizations.updateKajPolicyConfig({name: 'name'});

/*
Gets the KeyAccessJustificationsPolicyConfig for a given organization/folder/projects.
*/
await gapi.client.cloudkms.projects.getKajPolicyConfig({name: 'name'});

/*
Returns the effective Cloud KMS Autokey configuration for a given project.
*/
await gapi.client.cloudkms.projects.showEffectiveAutokeyConfig({
  parent: 'parent',
});

/*
Returns the KeyAccessJustificationsEnrollmentConfig of the resource closest to the given project in hierarchy.
*/
await gapi.client.cloudkms.projects.showEffectiveKeyAccessJustificationsEnrollmentConfig(
  {project: 'project'},
);

/*
Returns the KeyAccessJustificationsPolicyConfig of the resource closest to the given project in hierarchy.
*/
await gapi.client.cloudkms.projects.showEffectiveKeyAccessJustificationsPolicyConfig(
  {project: 'project'},
);

/*
Updates the KeyAccessJustificationsPolicyConfig for a given organization/folder/projects.
*/
await gapi.client.cloudkms.projects.updateKajPolicyConfig({name: 'name'});
```
