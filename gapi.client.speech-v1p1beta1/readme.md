# TypeScript typings for Cloud Speech-to-Text API v1p1beta1

Converts audio to text by applying powerful neural network models.
For detailed description please check [documentation](https://cloud.google.com/speech-to-text/docs/quickstart-protocol).

## Installing

Install typings for Cloud Speech-to-Text API:

```
npm install @types/gapi.client.speech-v1p1beta1 --save-dev
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
  'https://speech.googleapis.com/$discovery/rest?version=v1p1beta1',
  () => {
    // now we can use:
    // gapi.client.speech
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('speech', 'v1p1beta1', () => {
  // now we can use:
  // gapi.client.speech
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
  },
);
```

After that you can use Cloud Speech-to-Text API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
*/
await gapi.client.speech.operations.get({name: 'name'});

/*
Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
*/
await gapi.client.speech.operations.list({});

/*
Performs asynchronous speech recognition: receive results via the google.longrunning.Operations interface. Returns either an `Operation.error` or an `Operation.response` which contains a `LongRunningRecognizeResponse` message. For more information on asynchronous speech recognition, see the [how-to](https://cloud.google.com/speech-to-text/docs/async-recognize).
*/
await gapi.client.speech.speech.longrunningrecognize({});

/*
Performs synchronous speech recognition: receive results after all audio has been sent and processed.
*/
await gapi.client.speech.speech.recognize({});
```
