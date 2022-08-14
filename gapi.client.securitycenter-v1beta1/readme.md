# TypeScript typings for Security Command Center API v1beta1

Security Command Center API provides access to temporal views of assets and findings within an organization.
For detailed description please check [documentation](https://cloud.google.com/security-command-center).

## Installing

Install typings for Security Command Center API:

```
npm install @types/gapi.client.securitycenter-v1beta1 --save-dev
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
gapi.client.load('https://securitycenter.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.securitycenter
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('securitycenter', 'v1beta1', () => {
  // now we can use:
  // gapi.client.securitycenter
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

After that you can use Security Command Center API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets the settings for an organization.
*/
await gapi.client.securitycenter.organizations.getOrganizationSettings({ name: "name",  });

/*
Updates an organization's settings.
*/
await gapi.client.securitycenter.organizations.updateOrganizationSettings({ name: "name",  });
```
