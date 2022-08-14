# TypeScript typings for Cloud Natural Language API v1beta1

Provides natural language understanding technologies, such as sentiment analysis, entity recognition, entity sentiment analysis, and other text annotations, to developers.
For detailed description please check [documentation](https://cloud.google.com/natural-language/).

## Installing

Install typings for Cloud Natural Language API:

```
npm install @types/gapi.client.language-v1beta1 --save-dev
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
gapi.client.load('https://language.googleapis.com/$discovery/rest?version=v1beta1', () => {
  // now we can use:
  // gapi.client.language
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('language', 'v1beta1', () => {
  // now we can use:
  // gapi.client.language
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Apply machine learning models to reveal the structure and meaning of text
      'https://www.googleapis.com/auth/cloud-language',

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

After that you can use Cloud Natural Language API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Finds named entities (currently proper names and common nouns) in the text along with entity types, salience, mentions for each entity, and other properties.
*/
await gapi.client.language.documents.analyzeEntities({  });

/*
Analyzes the sentiment of the provided text.
*/
await gapi.client.language.documents.analyzeSentiment({  });

/*
Analyzes the syntax of the text and provides sentence boundaries and tokenization along with part of speech tags, dependency trees, and other properties.
*/
await gapi.client.language.documents.analyzeSyntax({  });

/*
A convenience method that provides all the features that analyzeSentiment, analyzeEntities, and analyzeSyntax provide in one call.
*/
await gapi.client.language.documents.annotateText({  });
```
