# TypeScript typings for Colab API v1

The Colab API lets you programmatically manage Colab runtimes.
For detailed description please check [documentation](https://developers.google.com/colab/api/reference/rest).

## Installing

Install typings for Colab API:

```
npm install @types/gapi.client.colaboratory-v1 --save-dev
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
      "gapi.client.colaboratory-v1"
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
  'https://colaboratory.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.colaboratory
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('colaboratory', 'v1', () => {
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
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.colaboratory.operations.get({name: 'name'});

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
*/
await gapi.client.colaboratory.operations.list({});

/*
Waits until the specified long-running operation is done or reaches at most a specified timeout, returning the latest state. If the operation is already done, the latest state is immediately returned. If the timeout specified is greater than the default HTTP/RPC timeout, the HTTP/RPC timeout is used. If the server does not support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort basis. It may return the latest state before the specified timeout (including immediately), meaning even an immediate response is no guarantee that the operation is done.
*/
await gapi.client.colaboratory.operations.wait({name: 'name'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.colaboratory-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
