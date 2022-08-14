# TypeScript typings for Service Networking API v1beta

Provides automatic management of network configurations necessary for certain services.
For detailed description please check [documentation](https://cloud.google.com/service-infrastructure/docs/service-networking/getting-started).

## Installing

Install typings for Service Networking API:

```
npm install @types/gapi.client.servicenetworking-v1beta --save-dev
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
gapi.client.load('https://servicenetworking.googleapis.com/$discovery/rest?version=v1beta', () => {
  // now we can use:
  // gapi.client.servicenetworking
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('servicenetworking', 'v1beta', () => {
  // now we can use:
  // gapi.client.servicenetworking
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // Manage your Google API service configuration
      'https://www.googleapis.com/auth/service.management',
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

After that you can use Service Networking API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.servicenetworking.operations.get({ name: "name",  });

/*
For service producers, provisions a new subnet in a peered service's shared VPC network in the requested region and with the requested size that's expressed as a CIDR range (number of leading bits of ipV4 network mask). The method checks against the assigned allocated ranges to find a non-conflicting IP address range. The method will reuse a subnet if subsequent calls contain the same subnet name, region, and prefix length. This method will make producer's tenant project to be a shared VPC service project as needed. The response from the `get` operation will be of type `Subnetwork` if the operation successfully completes.
*/
await gapi.client.servicenetworking.services.addSubnetwork({ parent: "parent",  });

/*
Service producers can use this method to find a currently unused range within consumer allocated ranges. This returned range is not reserved, and not guaranteed to remain unused. It will validate previously provided allocated ranges, find non-conflicting sub-range of requested size (expressed in number of leading bits of ipv4 network mask, as in CIDR range notation). Operation
*/
await gapi.client.servicenetworking.services.searchRange({ parent: "parent",  });

/*
Updates the allocated ranges that are assigned to a connection. The response from the `get` operation will be of type `Connection` if the operation successfully completes.
*/
await gapi.client.servicenetworking.services.updateConnections({ name: "name",  });
```
