# TypeScript typings for Cloud DNS API v1


For detailed description please check [documentation](https://cloud.google.com/dns/docs).

## Installing

Install typings for Cloud DNS API:

```
npm install @types/gapi.client.dns@v1 --save-dev
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
gapi.client.load('dns', 'v1', () => {
  // now we can use gapi.client.dns
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

      // View your data across Google Cloud services and see the email address of your Google Account
      'https://www.googleapis.com/auth/cloud-platform.read-only',

      // View your DNS records hosted by Google Cloud DNS
      'https://www.googleapis.com/auth/ndev.clouddns.readonly',

      // View and manage your DNS records hosted by Google Cloud DNS
      'https://www.googleapis.com/auth/ndev.clouddns.readwrite',
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

After that you can use Cloud DNS API resources:

```typescript

/*
Atomically updates the ResourceRecordSet collection.
*/
await gapi.client.dns.changes.create({ managedZone: "managedZone", project: "project",  });

/*
Fetches the representation of an existing Change.
*/
await gapi.client.dns.changes.get({ changeId: "changeId", managedZone: "managedZone", project: "project",  });

/*
Enumerates Changes to a ResourceRecordSet collection.
*/
await gapi.client.dns.changes.list({ managedZone: "managedZone", project: "project",  });

/*
Fetches the representation of an existing DnsKey.
*/
await gapi.client.dns.dnsKeys.get({ dnsKeyId: "dnsKeyId", managedZone: "managedZone", project: "project",  });

/*
Enumerates DnsKeys to a ResourceRecordSet collection.
*/
await gapi.client.dns.dnsKeys.list({ managedZone: "managedZone", project: "project",  });

/*
Fetches the representation of an existing Operation.
*/
await gapi.client.dns.managedZoneOperations.get({ managedZone: "managedZone", operation: "operation", project: "project",  });

/*
Enumerates Operations for the given ManagedZone.
*/
await gapi.client.dns.managedZoneOperations.list({ managedZone: "managedZone", project: "project",  });

/*
Creates a new ManagedZone.
*/
await gapi.client.dns.managedZones.create({ project: "project",  });

/*
Deletes a previously created ManagedZone.
*/
await gapi.client.dns.managedZones.delete({ managedZone: "managedZone", project: "project",  });

/*
Fetches the representation of an existing ManagedZone.
*/
await gapi.client.dns.managedZones.get({ managedZone: "managedZone", project: "project",  });

/*
Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
*/
await gapi.client.dns.managedZones.getIamPolicy({ resource: "resource",  });

/*
Enumerates ManagedZones that have been created but not yet deleted.
*/
await gapi.client.dns.managedZones.list({ project: "project",  });

/*
Applies a partial update to an existing ManagedZone.
*/
await gapi.client.dns.managedZones.patch({ managedZone: "managedZone", project: "project",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
*/
await gapi.client.dns.managedZones.setIamPolicy({ resource: "resource",  });

/*
Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
*/
await gapi.client.dns.managedZones.testIamPermissions({ resource: "resource",  });

/*
Updates an existing ManagedZone.
*/
await gapi.client.dns.managedZones.update({ managedZone: "managedZone", project: "project",  });

/*
Creates a new Policy.
*/
await gapi.client.dns.policies.create({ project: "project",  });

/*
Deletes a previously created Policy. Fails if the policy is still being referenced by a network.
*/
await gapi.client.dns.policies.delete({ policy: "policy", project: "project",  });

/*
Fetches the representation of an existing Policy.
*/
await gapi.client.dns.policies.get({ policy: "policy", project: "project",  });

/*
Enumerates all Policies associated with a project.
*/
await gapi.client.dns.policies.list({ project: "project",  });

/*
Applies a partial update to an existing Policy.
*/
await gapi.client.dns.policies.patch({ policy: "policy", project: "project",  });

/*
Updates an existing Policy.
*/
await gapi.client.dns.policies.update({ policy: "policy", project: "project",  });

/*
Fetches the representation of an existing Project.
*/
await gapi.client.dns.projects.get({ project: "project",  });

/*
Creates a new ResourceRecordSet.
*/
await gapi.client.dns.resourceRecordSets.create({ managedZone: "managedZone", project: "project",  });

/*
Deletes a previously created ResourceRecordSet.
*/
await gapi.client.dns.resourceRecordSets.delete({ managedZone: "managedZone", name: "name", project: "project", type: "type",  });

/*
Fetches the representation of an existing ResourceRecordSet.
*/
await gapi.client.dns.resourceRecordSets.get({ managedZone: "managedZone", name: "name", project: "project", type: "type",  });

/*
Enumerates ResourceRecordSets that you have created but not yet deleted.
*/
await gapi.client.dns.resourceRecordSets.list({ managedZone: "managedZone", project: "project",  });

/*
Applies a partial update to an existing ResourceRecordSet.
*/
await gapi.client.dns.resourceRecordSets.patch({ managedZone: "managedZone", name: "name", project: "project", type: "type",  });

/*
Creates a new Response Policy
*/
await gapi.client.dns.responsePolicies.create({ project: "project",  });

/*
Deletes a previously created Response Policy. Fails if the response policy is non-empty or still being referenced by a network.
*/
await gapi.client.dns.responsePolicies.delete({ project: "project", responsePolicy: "responsePolicy",  });

/*
Fetches the representation of an existing Response Policy.
*/
await gapi.client.dns.responsePolicies.get({ project: "project", responsePolicy: "responsePolicy",  });

/*
Enumerates all Response Policies associated with a project.
*/
await gapi.client.dns.responsePolicies.list({ project: "project",  });

/*
Applies a partial update to an existing Response Policy.
*/
await gapi.client.dns.responsePolicies.patch({ project: "project", responsePolicy: "responsePolicy",  });

/*
Updates an existing Response Policy.
*/
await gapi.client.dns.responsePolicies.update({ project: "project", responsePolicy: "responsePolicy",  });

/*
Creates a new Response Policy Rule.
*/
await gapi.client.dns.responsePolicyRules.create({ project: "project", responsePolicy: "responsePolicy",  });

/*
Deletes a previously created Response Policy Rule.
*/
await gapi.client.dns.responsePolicyRules.delete({ project: "project", responsePolicy: "responsePolicy", responsePolicyRule: "responsePolicyRule",  });

/*
Fetches the representation of an existing Response Policy Rule.
*/
await gapi.client.dns.responsePolicyRules.get({ project: "project", responsePolicy: "responsePolicy", responsePolicyRule: "responsePolicyRule",  });

/*
Enumerates all Response Policy Rules associated with a project.
*/
await gapi.client.dns.responsePolicyRules.list({ project: "project", responsePolicy: "responsePolicy",  });

/*
Applies a partial update to an existing Response Policy Rule.
*/
await gapi.client.dns.responsePolicyRules.patch({ project: "project", responsePolicy: "responsePolicy", responsePolicyRule: "responsePolicyRule",  });

/*
Updates an existing Response Policy Rule.
*/
await gapi.client.dns.responsePolicyRules.update({ project: "project", responsePolicy: "responsePolicy", responsePolicyRule: "responsePolicyRule",  });
```
