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
      // View and manage your data across Google Cloud Platform services
      'https://www.googleapis.com/auth/cloud-platform',

      // View your data across Google Cloud Platform services
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
Enumerates ManagedZones that have been created but not yet deleted.
*/
await gapi.client.dns.managedZones.list({ project: "project",  });

/*
Applies a partial update to an existing ManagedZone.
*/
await gapi.client.dns.managedZones.patch({ managedZone: "managedZone", project: "project",  });

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
Enumerates ResourceRecordSets that you have created but not yet deleted.
*/
await gapi.client.dns.resourceRecordSets.list({ managedZone: "managedZone", project: "project",  });
```
