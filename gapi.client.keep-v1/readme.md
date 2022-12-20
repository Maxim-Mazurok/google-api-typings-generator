# TypeScript typings for Google Keep API v1

The Google Keep API is used in an enterprise environment to manage Google Keep content and resolve issues identified by cloud security software.
For detailed description please check [documentation](https://developers.google.com/keep/api).

## Installing

Install typings for Google Keep API:

```
npm install @types/gapi.client.keep-v1 --save-dev
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
gapi.client.load('https://keep.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.keep
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('keep', 'v1', () => {
  // now we can use:
  // gapi.client.keep
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, create and permanently delete all your Google Keep data
      'https://www.googleapis.com/auth/keep',

      // View all your Google Keep data
      'https://www.googleapis.com/auth/keep.readonly',
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

After that you can use Google Keep API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets an attachment. To download attachment media via REST requires the alt=media query parameter. Returns a 400 bad request error if attachment media is not available in the requested MIME type.
*/
await gapi.client.keep.media.download({ name: "name",  });

/*
Creates a new note.
*/
await gapi.client.keep.notes.create({  });

/*
Deletes a note. Caller must have the `OWNER` role on the note to delete. Deleting a note removes the resource immediately and cannot be undone. Any collaborators will lose access to the note.
*/
await gapi.client.keep.notes.delete({ name: "name",  });

/*
Gets a note.
*/
await gapi.client.keep.notes.get({ name: "name",  });

/*
Lists notes. Every list call returns a page of results with `page_size` as the upper bound of returned items. A `page_size` of zero allows the server to choose the upper bound. The ListNotesResponse contains at most `page_size` entries. If there are more things left to list, it provides a `next_page_token` value. (Page tokens are opaque values.) To get the next page of results, copy the result's `next_page_token` into the next request's `page_token`. Repeat until the `next_page_token` returned with a page of results is empty. ListNotes return consistent results in the face of concurrent changes, or signals that it cannot with an ABORTED error.
*/
await gapi.client.keep.notes.list({  });
```
