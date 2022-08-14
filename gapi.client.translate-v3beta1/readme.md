# TypeScript typings for Cloud Translation API v3beta1

Integrates text translation into your website or application.
For detailed description please check [documentation](https://cloud.google.com/translate/docs/quickstarts).

## Installing

Install typings for Cloud Translation API:

```
npm install @types/gapi.client.translate-v3beta1 --save-dev
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
gapi.client.load('https://translation.googleapis.com/$discovery/rest?version=v3beta1', () => {
  // now we can use:
  // gapi.client.translate
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('translate', 'v3beta1', () => {
  // now we can use:
  // gapi.client.translate
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
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

After that you can use Cloud Translation API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Detects the language of text within a request.
*/
await gapi.client.translate.projects.detectLanguage({ parent: "parent",  });

/*
Returns a list of supported languages for translation.
*/
await gapi.client.translate.projects.getSupportedLanguages({ parent: "parent",  });

/*
Translates input text and returns translated text.
*/
await gapi.client.translate.projects.translateText({ parent: "parent",  });
```
