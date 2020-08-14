# TypeScript typings for Cloud Text-to-Speech API v1

Synthesizes natural-sounding speech by applying powerful neural network models.
For detailed description please check [documentation](https://cloud.google.com/text-to-speech/).

## Installing

Install typings for Cloud Text-to-Speech API:

```
npm install @types/gapi.client.texttospeech@v1 --save-dev
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
gapi.client.load('texttospeech', 'v1', () => {
  // now we can use gapi.client.texttospeech
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

After that you can use Cloud Text-to-Speech API resources:

```typescript

/*
Synthesizes speech synchronously: receive results after all text input has been processed.
*/
await gapi.client.texttospeech.text.synthesize({  });

/*
Returns a list of Voice supported for synthesis.
*/
await gapi.client.texttospeech.voices.list({  });
```
