# TypeScript typings for Cloud Translation API v3

Integrates text translation into your website or application.
For detailed description please check [documentation](https://cloud.google.com/translate/docs/quickstarts).

## Installing

Install typings for Cloud Translation API:

```
npm install @types/gapi.client.translate@v3 --save-dev
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
gapi.client.load('translate', 'v3', () => {
  // now we can use gapi.client.translate
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

After that you can use Cloud Translation API resources:

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
