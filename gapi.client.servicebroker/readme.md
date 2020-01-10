# TypeScript typings for Service Broker API v1
The Google Cloud Platform Service Broker API provides Google hosted
implementation of the Open Service Broker API
(https://www.openservicebrokerapi.org/).

For detailed description please check [documentation](https://cloud.google.com/kubernetes-engine/docs/concepts/add-on/service-broker).

## Installing

Install typings for Service Broker API:
```
npm install @types/gapi.client.servicebroker@v1 --save-dev
```

## Usage

You need to initialize Google API client in your code:
```typescript
gapi.load("client", () => { 
    // now we can use gapi.client
    // ... 
});
```

Then load api client wrapper:
```typescript
gapi.client.load('servicebroker', 'v1', () => {
    // now we can use gapi.client.servicebroker
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
    ],
    immediate = true;
// ...

gapi.auth.authorize({ client_id: client_id, scope: scope, immediate: immediate }, authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});            
```

After that you can use Service Broker API resources:

```typescript 
    
/* 
Gets the access control policy for a resource.
Returns an empty policy if the resource exists and does not have a policy
set.  
*/
await gapi.client.v1.getIamPolicy({ resource: "resource",  }); 
    
/* 
Sets the access control policy on the specified resource. Replaces any
existing policy.

Can return Public Errors: NOT_FOUND, INVALID_ARGUMENT and PERMISSION_DENIED  
*/
await gapi.client.v1.setIamPolicy({ resource: "resource",  }); 
    
/* 
Returns permissions that a caller has on the specified resource.
If the resource does not exist, this will return an empty set of
permissions, not a NOT_FOUND error.

Note: This operation is designed to be used for building permission-aware
UIs and command-line tools, not for authorization checking. This operation
may "fail open" without warning.  
*/
await gapi.client.v1.testIamPermissions({ resource: "resource",  });
```
