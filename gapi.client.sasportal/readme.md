# TypeScript typings for SAS Portal API v1alpha1


For detailed description please check [documentation](https://developers.google.com/spectrum-access-system/).

## Installing

Install typings for SAS Portal API:

```
npm install @types/gapi.client.sasportal@v1alpha1 --save-dev
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
gapi.client.load('sasportal', 'v1alpha1', () => {
  // now we can use gapi.client.sasportal
  // ...
});
```



After that you can use SAS Portal API resources:

```typescript

/*
Returns a requested customer.
*/
await gapi.client.sasportal.customers.get({ name: "name",  });

/*
Returns a list of requested customers.
*/
await gapi.client.sasportal.customers.list({  });

/*
Updates an existing customer.
*/
await gapi.client.sasportal.customers.patch({ name: "name",  });

/*
Returns a requested deployment.
*/
await gapi.client.sasportal.deployments.get({ name: "name",  });

/*
Generates a secret to be used with the ValidateInstaller.
*/
await gapi.client.sasportal.installer.generateSecret({  });

/*
Validates the identity of a Certified Professional Installer (CPI).
*/
await gapi.client.sasportal.installer.validate({  });

/*
Returns a requested node.
*/
await gapi.client.sasportal.nodes.get({ name: "name",  });

/*
Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
*/
await gapi.client.sasportal.policies.get({  });

/*
Sets the access control policy on the specified resource. Replaces any existing policy.
*/
await gapi.client.sasportal.policies.set({  });

/*
Returns permissions that a caller has on the specified resource.
*/
await gapi.client.sasportal.policies.test({  });
```
