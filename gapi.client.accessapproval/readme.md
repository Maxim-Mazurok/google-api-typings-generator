# TypeScript typings for Access Approval API v1

An API for controlling access to data by Google personnel.
For detailed description please check [documentation](https://cloud.google.com/access-approval/docs).

## Installing

Install typings for Access Approval API:

```
npm install @types/gapi.client.accessapproval@v1 --save-dev
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
gapi.client.load('accessapproval', 'v1', () => {
  // now we can use gapi.client.accessapproval
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

After that you can use Access Approval API resources:

```typescript

/*
Deletes the settings associated with a project, folder, or organization. This will have the effect of disabling Access Approval for the project, folder, or organization, but only if all ancestors also have Access Approval disabled. If Access Approval is enabled at a higher level of the hierarchy, then Access Approval will still be enabled at this level as the settings are inherited.
*/
await gapi.client.accessapproval.folders.deleteAccessApprovalSettings({ name: "name",  });

/*
Gets the settings associated with a project, folder, or organization.
*/
await gapi.client.accessapproval.folders.getAccessApprovalSettings({ name: "name",  });

/*
Updates the settings associated with a project, folder, or organization. Settings to update are determined by the value of field_mask.
*/
await gapi.client.accessapproval.folders.updateAccessApprovalSettings({ name: "name",  });

/*
Deletes the settings associated with a project, folder, or organization. This will have the effect of disabling Access Approval for the project, folder, or organization, but only if all ancestors also have Access Approval disabled. If Access Approval is enabled at a higher level of the hierarchy, then Access Approval will still be enabled at this level as the settings are inherited.
*/
await gapi.client.accessapproval.organizations.deleteAccessApprovalSettings({ name: "name",  });

/*
Gets the settings associated with a project, folder, or organization.
*/
await gapi.client.accessapproval.organizations.getAccessApprovalSettings({ name: "name",  });

/*
Updates the settings associated with a project, folder, or organization. Settings to update are determined by the value of field_mask.
*/
await gapi.client.accessapproval.organizations.updateAccessApprovalSettings({ name: "name",  });

/*
Deletes the settings associated with a project, folder, or organization. This will have the effect of disabling Access Approval for the project, folder, or organization, but only if all ancestors also have Access Approval disabled. If Access Approval is enabled at a higher level of the hierarchy, then Access Approval will still be enabled at this level as the settings are inherited.
*/
await gapi.client.accessapproval.projects.deleteAccessApprovalSettings({ name: "name",  });

/*
Gets the settings associated with a project, folder, or organization.
*/
await gapi.client.accessapproval.projects.getAccessApprovalSettings({ name: "name",  });

/*
Updates the settings associated with a project, folder, or organization. Settings to update are determined by the value of field_mask.
*/
await gapi.client.accessapproval.projects.updateAccessApprovalSettings({ name: "name",  });
```
