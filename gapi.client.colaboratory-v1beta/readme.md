# TypeScript typings for Colab API v1beta

The Colab API lets you programmatically manage Colab runtimes.
For detailed description please check [documentation](https://developers.google.com/colab/api/reference/rest).

## Installing

Install typings for Colab API:

```
npm install @types/gapi.client.colaboratory-v1beta --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "gapi",
      "gapi.auth2",
      "gapi.client",
      "gapi.client.colaboratory-v1beta"
    ]
  }
}
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
gapi.client.load(
  'https://colaboratory.googleapis.com/$discovery/rest?version=v1beta',
  () => {
    // now we can use:
    // gapi.client.colaboratory
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('colaboratory', 'v1beta', () => {
  // now we can use:
  // gapi.client.colaboratory
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Read, write, and delete your Colab resources
    'https://www.googleapis.com/auth/colaboratory',

    // Read-only access to your Colab resources
    'https://www.googleapis.com/auth/colaboratory.readonly',
  ],
  immediate = true;
// ...

gapi.auth.authorize(
  {client_id: client_id, scope: scope, immediate: immediate},
  authResult => {
    if (authResult && !authResult.error) {
      /* handle successful authorization */
    } else {
      /* handle authorization error */
    }
  },
);
```

After that you can use Colab API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Creates a Colab runtime assignment. When runtime creation is refused with a [`FAILED_PRECONDITION` (code: 9)](https://github.com/googleapis/googleapis/blob/437254f595a380cd9323111700ce0fcf9d6d2c21/google/rpc/code.proto#L128) error, a more specific error reason will be returned in the details of the Operation error wrapped in google.rpc.ErrorInfo. A requests-per-minute-per-project and a requests-per-minute-per-user quota are enforced on this API. To see the exact limit your project is subject to, after you enable the Colab API, view it in your project's [Quotas & System Limits](https://console.cloud.google.com/apis/api/colaboratory.googleapis.com/quotas) page. Note that there is no usage reporting on the per-user limit and it is not overridable at the individual user level.
*/
await gapi.client.colaboratory.runtimes.create({});

/*
Deletes a Colab runtime assignment. **Best Practices:** - Avoid deleting runtimes unless necessary. Reuse runtimes for efficiency. - Open a new Jupyter session on an existing runtime for state isolation.
*/
await gapi.client.colaboratory.runtimes.delete({name: 'name'});

/*
Gets a Colab runtime assigned to the requesting user.
*/
await gapi.client.colaboratory.runtimes.get({name: 'name'});

/*
Lists Colab runtimes assigned to the requesting user.
*/
await gapi.client.colaboratory.runtimes.list({});

/*
Lists available Colab runtime specs and their eligibility to the requesting user.
*/
await gapi.client.colaboratory.runtimespecs.list({});

/*
Gets the subscription of the requesting user.
*/
await gapi.client.colaboratory.getSubscription({name: 'name'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.colaboratory-v1beta#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
