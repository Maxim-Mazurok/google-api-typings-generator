# TypeScript typings for Google Forms API v1

Reads and writes Google Forms and responses.
For detailed description please check [documentation](https://developers.google.com/forms/api).

## Installing

Install typings for Google Forms API:

```
npm install @types/gapi.client.forms-v1 --save-dev
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
gapi.client.load('https://forms.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.forms
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('forms', 'v1', () => {
  // now we can use:
  // gapi.client.forms
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, create, and delete all of your Google Drive files
      'https://www.googleapis.com/auth/drive',

      // See, edit, create, and delete only the specific Google Drive files you use with this app
      'https://www.googleapis.com/auth/drive.file',

      // See and download all your Google Drive files
      'https://www.googleapis.com/auth/drive.readonly',

      // See, edit, create, and delete all your Google Forms forms
      'https://www.googleapis.com/auth/forms.body',

      // See all your Google Forms forms
      'https://www.googleapis.com/auth/forms.body.readonly',

      // See all responses to your Google Forms forms
      'https://www.googleapis.com/auth/forms.responses.readonly',
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

After that you can use Google Forms API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Change the form with a batch of updates.
*/
await gapi.client.forms.forms.batchUpdate({ formId: "formId",  });

/*
Create a new form using the title given in the provided form message in the request. *Important:* Only the form.info.title and form.info.document_title fields are copied to the new form. All other fields including the form description, items and settings are disallowed. To create a new form and add items, you must first call forms.create to create an empty form with a title and (optional) document title, and then call forms.update to add the items.
*/
await gapi.client.forms.forms.create({  });

/*
Get a form.
*/
await gapi.client.forms.forms.get({ formId: "formId",  });
```
