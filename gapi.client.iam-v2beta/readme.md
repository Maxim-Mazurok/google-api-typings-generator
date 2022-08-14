# TypeScript typings for Identity and Access Management (IAM) API v2beta

Manages identity and access control for Google Cloud Platform resources, including the creation of service accounts, which you can use to authenticate to Google and make API calls. 
For detailed description please check [documentation](https://cloud.google.com/iam/).

## Installing

Install typings for Identity and Access Management (IAM) API:

```
npm install @types/gapi.client.iam-v2beta --save-dev
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
gapi.client.load('https://iam.googleapis.com/$discovery/rest?version=v2beta', () => {
  // now we can use:
  // gapi.client.iam
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('iam', 'v2beta', () => {
  // now we can use:
  // gapi.client.iam
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

After that you can use Identity and Access Management (IAM) API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Creates a policy.
*/
await gapi.client.iam.policies.createPolicy({ parent: "parent",  });

/*
Deletes a policy. This action is permanent.
*/
await gapi.client.iam.policies.delete({ name: "name",  });

/*
Gets a policy.
*/
await gapi.client.iam.policies.get({ name: "name",  });

/*
Retrieves the policies of the specified kind that are attached to a resource. The response lists only policy metadata. In particular, policy rules are omitted.
*/
await gapi.client.iam.policies.listPolicies({ parent: "parent",  });

/*
Updates the specified policy. You can update only the rules and the display name for the policy. To update a policy, you should use a read-modify-write loop: 1. Use GetPolicy to read the current version of the policy. 2. Modify the policy as needed. 3. Use `UpdatePolicy` to write the updated policy. This pattern helps prevent conflicts between concurrent updates.
*/
await gapi.client.iam.policies.update({ name: "name",  });
```
