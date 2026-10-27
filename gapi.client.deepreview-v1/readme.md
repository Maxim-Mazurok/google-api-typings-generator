# TypeScript typings for Deep Review API v1

Deep Review API for automated, in-depth document reviews.
For detailed description please check [documentation](https://research.google/deepreview).

## Installing

Install typings for Deep Review API:

```
npm install @types/gapi.client.deepreview-v1 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["gapi", "gapi.auth2", "gapi.client", "gapi.client.deepreview-v1"]
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
  'https://deepreview.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.deepreview
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('deepreview', 'v1', () => {
  // now we can use:
  // gapi.client.deepreview
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // See, edit, create, and delete only the specific Google Drive files you use with this app
    'https://www.googleapis.com/auth/drive.file',
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

After that you can use Deep Review API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Deletes a document and its stored content. If `force` is set to `true`, any associated reviews are also deleted.
*/
await gapi.client.deepreview.documents.delete({name: 'name'});

/*
Estimates what a review of a document would cost on the caller's Gemini API key. The estimate comes from what past reviews with the same model and depth cost, adjusted to this document's size and repriced at the Gemini API's current list prices. It covers one review attempt that runs to completion, and doesn't include retries after errors.
*/
await gapi.client.deepreview.documents.estimateReviewCost({
  document: 'document',
});

/*
Retrieves document metadata. The returned document includes its `latest_review_summary` when a review exists.
*/
await gapi.client.deepreview.documents.get({name: 'name'});

/*
Lists documents for the authenticated caller with cursor pagination. Each returned document includes its `latest_review_summary` when a review exists.
*/
await gapi.client.deepreview.documents.list({});

/*
Downloads the original document content (PDF binary) using media streaming. Pass `alt=media` as a query parameter to stream the binary PDF bytes. Without `alt=media`, a JSON response is returned.
*/
await gapi.client.deepreview.media.download({name: 'name'});

/*
Creates a new Document resource and ingests the manuscript using media upload or Google Drive.
*/
await gapi.client.deepreview.media.upload({});

/*
Retrieves the review quota limits and sliding-window usage for the authenticated caller.
*/
await gapi.client.deepreview.getUserQuota({name: 'name'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.deepreview-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
