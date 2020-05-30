# TypeScript typings for Google Cloud DNS API v1

Configures and serves authoritative DNS records.
For detailed description please check [documentation](https://developers.google.com/cloud-dns).

## Installing

Install typings for Google Cloud DNS API:

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

After that you can use Google Cloud DNS API resources:

```typescript

/*

*/
await gapi.client.dns.changes.create({ managedZone: "managedZone", project: "project",  });

/*

*/
await gapi.client.dns.changes.get({ changeId: "changeId", managedZone: "managedZone", project: "project",  });

/*

*/
await gapi.client.dns.changes.list({ managedZone: "managedZone", project: "project",  });

/*

*/
await gapi.client.dns.dnsKeys.get({ dnsKeyId: "dnsKeyId", managedZone: "managedZone", project: "project",  });

/*

*/
await gapi.client.dns.dnsKeys.list({ managedZone: "managedZone", project: "project",  });

/*

*/
await gapi.client.dns.managedZoneOperations.get({ managedZone: "managedZone", operation: "operation", project: "project",  });

/*

*/
await gapi.client.dns.managedZoneOperations.list({ managedZone: "managedZone", project: "project",  });

/*

*/
await gapi.client.dns.managedZones.create({ project: "project",  });

/*

*/
await gapi.client.dns.managedZones.delete({ managedZone: "managedZone", project: "project",  });

/*

*/
await gapi.client.dns.managedZones.get({ managedZone: "managedZone", project: "project",  });

/*

*/
await gapi.client.dns.managedZones.list({ project: "project",  });

/*

*/
await gapi.client.dns.managedZones.patch({ managedZone: "managedZone", project: "project",  });

/*

*/
await gapi.client.dns.managedZones.update({ managedZone: "managedZone", project: "project",  });

/*

*/
await gapi.client.dns.policies.create({ project: "project",  });

/*

*/
await gapi.client.dns.policies.delete({ policy: "policy", project: "project",  });

/*

*/
await gapi.client.dns.policies.get({ policy: "policy", project: "project",  });

/*

*/
await gapi.client.dns.policies.list({ project: "project",  });

/*

*/
await gapi.client.dns.policies.patch({ policy: "policy", project: "project",  });

/*

*/
await gapi.client.dns.policies.update({ policy: "policy", project: "project",  });

/*

*/
await gapi.client.dns.projects.get({ project: "project",  });

/*

*/
await gapi.client.dns.resourceRecordSets.list({ managedZone: "managedZone", project: "project",  });
```
