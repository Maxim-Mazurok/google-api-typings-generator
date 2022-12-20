# TypeScript typings for Google Cloud Translation API v2

The Google Cloud Translation API lets websites and programs integrate with
    Google Translate programmatically.
For detailed description please check [documentation](https://code.google.com/apis/language/translate/v2/getting_started.html).

## Installing

Install typings for Google Cloud Translation API:

```
npm install @types/gapi.client.translate-v2 --save-dev
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
gapi.client.load('https://translation.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.language
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('translate', 'v2', () => {
  // now we can use:
  // gapi.client.language
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // View and manage your data across Google Cloud Platform services
      'https://www.googleapis.com/auth/cloud-platform',

      // Translate text from one language to another using Google Translate
      'https://www.googleapis.com/auth/cloud-translation',
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

After that you can use Google Cloud Translation API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Detects the language of text within a request.
*/
await gapi.client.language.detections.detect({  });

/*
Detects the language of text within a request.
*/
await gapi.client.language.detections.list({ q: "q",  });

/*
Returns a list of supported languages for translation.
*/
await gapi.client.language.languages.list({  });

/*
Translates input text, returning translated text.
*/
await gapi.client.language.translations.list({ q: "q", target: "target",  });

/*
Translates input text, returning translated text.
*/
await gapi.client.language.translations.translate({  });
```
