# TypeScript typings for Identity and Access Management (IAM) API v1

Manages identity and access control for Google Cloud Platform resources, including the creation of service accounts, which you can use to authenticate to Google and make API calls.
For detailed description please check [documentation](https://cloud.google.com/iam/).

## Installing

Install typings for Identity and Access Management (IAM) API:

```
npm install @types/gapi.client.iam@v1 --save-dev
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
gapi.client.load('iam', 'v1', () => {
  // now we can use gapi.client.iam
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

After that you can use Identity and Access Management (IAM) API resources:

```typescript

/*
Lints a Cloud IAM policy object or its sub fields. Currently supports
google.iam.v1.Binding.condition.

Each lint operation consists of multiple lint validation units.
Each unit inspects the input object in regard to a particular linting
aspect and issues a google.iam.admin.v1.LintResult disclosing the
result.

The set of applicable validation units is determined by the Cloud IAM
server and is not configurable.

Regardless of any lint issues or their severities, successful calls to
`lintPolicy` return an HTTP 200 OK status code.
*/
await gapi.client.iam.iamPolicies.lintPolicy({  });

/*
Returns a list of services that support service level audit logging
configuration for the given resource.
*/
await gapi.client.iam.iamPolicies.queryAuditableServices({  });

/*
Lists the permissions testable on a resource.
A permission is testable if it can be tested for an identity on a resource.
*/
await gapi.client.iam.permissions.queryTestablePermissions({  });

/*
Gets a Role definition.
*/
await gapi.client.iam.roles.get({ name: "name",  });

/*
Lists the Roles defined on a resource.
*/
await gapi.client.iam.roles.list({  });

/*
Queries roles that can be granted on a particular resource.
A role is grantable if it can be used as the role in a binding for a policy
for that resource.
*/
await gapi.client.iam.roles.queryGrantableRoles({  });
```
