# TypeScript typings for Google Docs API v1

Reads and writes Google Docs documents.
For detailed description please check [documentation](https://developers.google.com/docs/).

## Installing

Install typings for Google Docs API:

```
npm install @types/gapi.client.docs-v1 --save-dev
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
gapi.client.load('https://docs.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.docs
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('docs', 'v1', () => {
  // now we can use:
  // gapi.client.docs
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, create, and delete all your Google Docs documents
      'https://www.googleapis.com/auth/documents',

      // See all your Google Docs documents
      'https://www.googleapis.com/auth/documents.readonly',

      // See, edit, create, and delete all of your Google Drive files
      'https://www.googleapis.com/auth/drive',

      // See, edit, create, and delete only the specific Google Drive files you use with this app
      'https://www.googleapis.com/auth/drive.file',

      // See and download all your Google Drive files
      'https://www.googleapis.com/auth/drive.readonly',
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

After that you can use Google Docs API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Applies one or more updates to the document. Each request is validated before being applied. If any request is not valid, then the entire request will fail and nothing will be applied. Some requests have replies to give you some information about how they are applied. Other requests do not need to return information; these each return an empty reply. The order of replies matches that of the requests. For example, suppose you call batchUpdate with four updates, and only the third one returns information. The response would have two empty replies, the reply to the third request, and another empty reply, in that order. Because other users may be editing the document, the document might not exactly reflect your changes: your changes may be altered with respect to collaborator changes. If there are no collaborators, the document should reflect your changes. In any case, the updates in your request are guaranteed to be applied together atomically.
*/
await gapi.client.docs.documents.batchUpdate({ documentId: "documentId",  });

/*
Creates a blank document using the title given in the request. Other fields in the request, including any provided content, are ignored. Returns the created document.
*/
await gapi.client.docs.documents.create({  });

/*
Gets the latest version of the specified document.
*/
await gapi.client.docs.documents.get({ documentId: "documentId",  });
```
