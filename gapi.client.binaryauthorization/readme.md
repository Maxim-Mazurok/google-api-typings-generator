# TypeScript typings for Binary Authorization API v1

The management interface for Binary Authorization, a system providing policy control for images deployed to Kubernetes Engine clusters. 
For detailed description please check [documentation](https://cloud.google.com/binary-authorization/).

## Installing

Install typings for Binary Authorization API:

```
npm install @types/gapi.client.binaryauthorization@v1 --save-dev
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
gapi.client.load('binaryauthorization', 'v1', () => {
  // now we can use gapi.client.binaryauthorization
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

After that you can use Binary Authorization API resources:

```typescript

/*
A policy specifies the attestors that must attest to a container image, before the project is allowed to deploy that image. There is at most one policy per project. All image admission requests are permitted if a project has no policy. Gets the policy for this project. Returns a default policy if the project does not have one.
*/
await gapi.client.binaryauthorization.projects.getPolicy({ name: "name",  });

/*
Creates or updates a project's policy, and returns a copy of the new policy. A policy is always updated as a whole, to avoid race conditions with concurrent policy enforcement (or management!) requests. Returns NOT_FOUND if the project does not exist, INVALID_ARGUMENT if the request is malformed.
*/
await gapi.client.binaryauthorization.projects.updatePolicy({ name: "name",  });

/*
Gets the current system policy in the specified location.
*/
await gapi.client.binaryauthorization.systempolicy.getPolicy({ name: "name",  });
```
