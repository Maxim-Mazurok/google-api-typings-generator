# TypeScript typings for Developer Knowledge API v1alpha

The Developer Knowledge API provides access to Google's developer knowledge.
For detailed description please check [documentation](https://developers.google.com/knowledge).

## Installing

Install typings for Developer Knowledge API:

```
npm install @types/gapi.client.developerknowledge-v1alpha --save-dev
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
  'https://developerknowledge.googleapis.com/$discovery/rest?version=v1alpha',
  () => {
    // now we can use:
    // gapi.client.developerknowledge
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('developerknowledge', 'v1alpha', () => {
  // now we can use:
  // gapi.client.developerknowledge
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

After that you can use Developer Knowledge API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Retrieves multiple documents, each with its full Markdown content.
*/
await gapi.client.developerknowledge.documents.batchGet({});

/*
Retrieves a single document with its full Markdown content.
*/
await gapi.client.developerknowledge.documents.get({name: 'name'});

/*
Searches for developer knowledge across Google's developer documentation. This method returns document chunks based on the user's query. There can be many chunks of the same Document. To retrieve full documents, use DeveloperKnowledge.GetDocument or DeveloperKnowledge.BatchGetDocuments with the DocumentChunk.parent returned in the SearchDocumentChunksResponse.results.
*/
await gapi.client.developerknowledge.documents.searchDocumentChunks({});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.developerknowledge-v1alpha#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
