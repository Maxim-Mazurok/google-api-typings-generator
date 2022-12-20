# TypeScript typings for Cloud Deployment Manager V2 API alpha

The Google Cloud Deployment Manager v2 API provides services for configuring, deploying, and viewing Google Cloud services and APIs via templates which specify deployments of Cloud resources.
For detailed description please check [documentation](https://cloud.google.com/deployment-manager).

## Installing

Install typings for Cloud Deployment Manager V2 API:

```
npm install @types/gapi.client.deploymentmanager-alpha --save-dev
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
gapi.client.load('https://deploymentmanager.googleapis.com/$discovery/rest?version=alpha', () => {
  // now we can use:
  // gapi.client.deploymentmanager
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('deploymentmanager', 'alpha', () => {
  // now we can use:
  // gapi.client.deploymentmanager
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

      // View and manage your Google Cloud Platform management resources and deployment status information
      'https://www.googleapis.com/auth/ndev.cloudman',

      // View your Google Cloud Platform management resources and deployment status information
      'https://www.googleapis.com/auth/ndev.cloudman.readonly',
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

After that you can use Cloud Deployment Manager V2 API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Deletes a composite type.
*/
await gapi.client.deploymentmanager.compositeTypes.delete({ compositeType: "compositeType", project: "project",  });

/*
Gets information about a specific composite type.
*/
await gapi.client.deploymentmanager.compositeTypes.get({ compositeType: "compositeType", project: "project",  });

/*
Creates a composite type.
*/
await gapi.client.deploymentmanager.compositeTypes.insert({ project: "project",  });

/*
Lists all composite types for Deployment Manager.
*/
await gapi.client.deploymentmanager.compositeTypes.list({ project: "project",  });

/*
Patches a composite type.
*/
await gapi.client.deploymentmanager.compositeTypes.patch({ compositeType: "compositeType", project: "project",  });

/*
Updates a composite type.
*/
await gapi.client.deploymentmanager.compositeTypes.update({ compositeType: "compositeType", project: "project",  });

/*
Cancels and removes the preview currently associated with the deployment.
*/
await gapi.client.deploymentmanager.deployments.cancelPreview({ deployment: "deployment", project: "project",  });

/*
Deletes a deployment and all of the resources in the deployment.
*/
await gapi.client.deploymentmanager.deployments.delete({ deployment: "deployment", project: "project",  });

/*
Gets information about a specific deployment.
*/
await gapi.client.deploymentmanager.deployments.get({ deployment: "deployment", project: "project",  });

/*
Gets the access control policy for a resource. May be empty if no such policy or resource exists.
*/
await gapi.client.deploymentmanager.deployments.getIamPolicy({ project: "project", resource: "resource",  });

/*
Creates a deployment and all of the resources described by the deployment manifest.
*/
await gapi.client.deploymentmanager.deployments.insert({ project: "project",  });

/*
Lists all deployments for a given project.
*/
await gapi.client.deploymentmanager.deployments.list({ project: "project",  });

/*
Patches a deployment and all of the resources described by the deployment manifest.
*/
await gapi.client.deploymentmanager.deployments.patch({ deployment: "deployment", project: "project",  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.deploymentmanager.deployments.setIamPolicy({ project: "project", resource: "resource",  });

/*
Stops an ongoing operation. This does not roll back any work that has already been completed, but prevents any new work from being started.
*/
await gapi.client.deploymentmanager.deployments.stop({ deployment: "deployment", project: "project",  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.deploymentmanager.deployments.testIamPermissions({ project: "project", resource: "resource",  });

/*
Updates a deployment and all of the resources described by the deployment manifest.
*/
await gapi.client.deploymentmanager.deployments.update({ deployment: "deployment", project: "project",  });

/*
Gets information about a specific manifest.
*/
await gapi.client.deploymentmanager.manifests.get({ deployment: "deployment", manifest: "manifest", project: "project",  });

/*
Lists all manifests for a given deployment.
*/
await gapi.client.deploymentmanager.manifests.list({ deployment: "deployment", project: "project",  });

/*
Gets information about a specific operation.
*/
await gapi.client.deploymentmanager.operations.get({ operation: "operation", project: "project",  });

/*
Lists all operations for a project.
*/
await gapi.client.deploymentmanager.operations.list({ project: "project",  });

/*
Gets information about a single resource.
*/
await gapi.client.deploymentmanager.resources.get({ deployment: "deployment", project: "project", resource: "resource",  });

/*
Lists all resources in a given deployment.
*/
await gapi.client.deploymentmanager.resources.list({ deployment: "deployment", project: "project",  });

/*
Deletes a type provider.
*/
await gapi.client.deploymentmanager.typeProviders.delete({ project: "project", typeProvider: "typeProvider",  });

/*
Gets information about a specific type provider.
*/
await gapi.client.deploymentmanager.typeProviders.get({ project: "project", typeProvider: "typeProvider",  });

/*
Gets a type info for a type provided by a TypeProvider.
*/
await gapi.client.deploymentmanager.typeProviders.getType({ project: "project", type: "type", typeProvider: "typeProvider",  });

/*
Creates a type provider.
*/
await gapi.client.deploymentmanager.typeProviders.insert({ project: "project",  });

/*
Lists all resource type providers for Deployment Manager.
*/
await gapi.client.deploymentmanager.typeProviders.list({ project: "project",  });

/*
Lists all the type info for a TypeProvider.
*/
await gapi.client.deploymentmanager.typeProviders.listTypes({ project: "project", typeProvider: "typeProvider",  });

/*
Patches a type provider.
*/
await gapi.client.deploymentmanager.typeProviders.patch({ project: "project", typeProvider: "typeProvider",  });

/*
Updates a type provider.
*/
await gapi.client.deploymentmanager.typeProviders.update({ project: "project", typeProvider: "typeProvider",  });

/*
Gets information about a specific type.
*/
await gapi.client.deploymentmanager.types.get({ project: "project", type: "type",  });

/*
Lists all resource types for Deployment Manager.
*/
await gapi.client.deploymentmanager.types.list({ project: "project",  });
```
