# TypeScript typings for Cloud Text-to-Speech API v1

Synthesizes natural-sounding speech by applying powerful neural network models.
For detailed description please check [documentation](https://cloud.google.com/text-to-speech/).

## Installing

Install typings for Cloud Text-to-Speech API:

```
npm install @types/gapi.client.texttospeech-v1 --save-dev
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
  'https://texttospeech.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.texttospeech
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('texttospeech', 'v1', () => {
  // now we can use:
  // gapi.client.texttospeech
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
  {client_id: client_id, scope: scope, immediate: immediate},
  authResult => {
    if (authResult && !authResult.error) {
      /* handle successful authorization */
    } else {
      /* handle authorization error */
    }
  }
);
```

After that you can use Cloud Text-to-Speech API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
*/
await gapi.client.texttospeech.operations.cancel({name: 'name'});

/*
Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
*/
await gapi.client.texttospeech.operations.delete({name: 'name'});

/*
Synthesizes speech synchronously: receive results after all text input has been processed.
*/
await gapi.client.texttospeech.text.synthesize({});

/*
Returns a list of Voice supported for synthesis.
*/
await gapi.client.texttospeech.voices.list({});
```