# TypeScript typings for Cloud Identity API v1beta1

API for provisioning and managing identity resources.
For detailed description please check [documentation](https://cloud.google.com/identity/).

## Installing

Install typings for Cloud Identity API:

```
npm install @types/gapi.client.cloudidentity-v1beta1 --save-dev
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
gapi.client.load('https://cloudidentity.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.cloudidentity
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('cloudidentity', 'v1beta1', () => {
  // now we can use:
  // gapi.client.cloudidentity
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Private Service: https://www.googleapis.com/auth/cloud-identity.devices
      'https://www.googleapis.com/auth/cloud-identity.devices',

      // See your device details
      'https://www.googleapis.com/auth/cloud-identity.devices.lookup',

      // Private Service: https://www.googleapis.com/auth/cloud-identity.devices.readonly
      'https://www.googleapis.com/auth/cloud-identity.devices.readonly',

      // See, change, create, and delete any of the Cloud Identity Groups that you can access, including the members of each group
      'https://www.googleapis.com/auth/cloud-identity.groups',

      // See any Cloud Identity Groups that you can access, including group members and their emails
      'https://www.googleapis.com/auth/cloud-identity.groups.readonly',

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

After that you can use Cloud Identity API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Cancels an unfinished device wipe. This operation can be used to cancel device wipe in the gap between the wipe operation returning success and the device being wiped.
*/
await gapi.client.cloudidentity.devices.cancelWipe({ name: "name",  });

/*
Creates a device. Only company-owned device may be created. **Note**: This method is available only to customers who have one of the following SKUs: Enterprise Standard, Enterprise Plus, Enterprise for Education, and Cloud Identity Premium
*/
await gapi.client.cloudidentity.devices.create({  });

/*
Deletes the specified device.
*/
await gapi.client.cloudidentity.devices.delete({ name: "name",  });

/*
Retrieves the specified device.
*/
await gapi.client.cloudidentity.devices.get({ name: "name",  });

/*
Lists/Searches devices.
*/
await gapi.client.cloudidentity.devices.list({  });

/*
Wipes all data on the specified device.
*/
await gapi.client.cloudidentity.devices.wipe({ name: "name",  });

/*
Creates a `Group`.
*/
await gapi.client.cloudidentity.groups.create({  });

/*
Deletes a `Group`.
*/
await gapi.client.cloudidentity.groups.delete({ name: "name",  });

/*
Retrieves a `Group`.
*/
await gapi.client.cloudidentity.groups.get({ name: "name",  });

/*
Get Security Settings
*/
await gapi.client.cloudidentity.groups.getSecuritySettings({ name: "name",  });

/*
Lists the `Group` resources under a customer or namespace.
*/
await gapi.client.cloudidentity.groups.list({  });

/*
Looks up the [resource name](https://cloud.google.com/apis/design/resource_names) of a `Group` by its `EntityKey`.
*/
await gapi.client.cloudidentity.groups.lookup({  });

/*
Updates a `Group`.
*/
await gapi.client.cloudidentity.groups.patch({ name: "name",  });

/*
Searches for `Group` resources matching a specified query.
*/
await gapi.client.cloudidentity.groups.search({  });

/*
Update Security Settings
*/
await gapi.client.cloudidentity.groups.updateSecuritySettings({ name: "name",  });

/*
Creates an InboundSamlSsoProfile for a customer.
*/
await gapi.client.cloudidentity.inboundSamlSsoProfiles.create({  });

/*
Deletes an InboundSamlSsoProfile.
*/
await gapi.client.cloudidentity.inboundSamlSsoProfiles.delete({ name: "name",  });

/*
Gets an InboundSamlSsoProfile.
*/
await gapi.client.cloudidentity.inboundSamlSsoProfiles.get({ name: "name",  });

/*
Lists InboundSamlSsoProfiles for a customer.
*/
await gapi.client.cloudidentity.inboundSamlSsoProfiles.list({  });

/*
Updates an InboundSamlSsoProfile.
*/
await gapi.client.cloudidentity.inboundSamlSsoProfiles.patch({ name: "name",  });

/*
Creates an InboundSsoAssignment for users and devices in a `Customer` under a given `Group` or `OrgUnit`.
*/
await gapi.client.cloudidentity.inboundSsoAssignments.create({  });

/*
Deletes an InboundSsoAssignment. To disable SSO, Create (or Update) an assignment that has `sso_mode` == `SSO_OFF`.
*/
await gapi.client.cloudidentity.inboundSsoAssignments.delete({ name: "name",  });

/*
Gets an InboundSsoAssignment.
*/
await gapi.client.cloudidentity.inboundSsoAssignments.get({ name: "name",  });

/*
Lists the InboundSsoAssignments for a `Customer`.
*/
await gapi.client.cloudidentity.inboundSsoAssignments.list({  });

/*
Updates an InboundSsoAssignment. The body of this request is the `inbound_sso_assignment` field and the `update_mask` is relative to that. For example: a PATCH to `/v1beta1/inboundSsoAssignments/0abcdefg1234567&update_mask=rank` with a body of `{ "rank": 1 }` moves that (presumably group-targeted) SSO assignment to the highest priority and shifts any other group-targeted assignments down in priority.
*/
await gapi.client.cloudidentity.inboundSsoAssignments.patch({ name: "name",  });
```
