# TypeScript typings for Google Sheets API v4

Reads and writes Google Sheets.
For detailed description please check [documentation](https://developers.google.com/workspace/sheets/).

## Installing

Install typings for Google Sheets API:

```
npm install @types/gapi.client.sheets-v4 --save-dev
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
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
  () => {
    // now we can use:
    // gapi.client.sheets
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('sheets', 'v4', () => {
  // now we can use:
  // gapi.client.sheets
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

    // See, edit, create, and delete all your Google Sheets spreadsheets
    'https://www.googleapis.com/auth/spreadsheets',

    // See all your Google Sheets spreadsheets
    'https://www.googleapis.com/auth/spreadsheets.readonly',
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

After that you can use Google Sheets API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Applies one or more updates to the spreadsheet. Each request is validated before being applied. If any request is not valid then the entire request will fail and nothing will be applied. Some requests have replies to give you some information about how they are applied. The replies will mirror the requests. For example, if you applied 4 updates and the 3rd one had a reply, then the response will have 2 empty replies, the actual reply, and another empty reply, in that order. Due to the collaborative nature of spreadsheets, it is not guaranteed that the spreadsheet will reflect exactly your changes after this completes, however it is guaranteed that the updates in the request will be applied together atomically. Your changes may be altered with respect to collaborator changes. If there are no collaborators, the spreadsheet should reflect your changes.
*/
await gapi.client.sheets.spreadsheets.batchUpdate({
  spreadsheetId: 'spreadsheetId',
});

/*
Creates a spreadsheet, returning the newly created spreadsheet.
*/
await gapi.client.sheets.spreadsheets.create({});

/*
Returns the spreadsheet at the given ID. The caller must specify the spreadsheet ID. By default, data within grids is not returned. You can include grid data in one of 2 ways: * Specify a [field mask](https://developers.google.com/workspace/sheets/api/guides/field-masks) listing your desired fields using the `fields` URL parameter in HTTP * Set the includeGridData URL parameter to true. If a field mask is set, the `includeGridData` parameter is ignored For large spreadsheets, as a best practice, retrieve only the specific spreadsheet fields that you want. To retrieve only subsets of spreadsheet data, use the ranges URL parameter. Ranges are specified using [A1 notation](https://developers.google.com/workspace/sheets/api/guides/concepts#cell). You can define a single cell (for example, `A1`) or multiple cells (for example, `A1:D5`). You can also get cells from other sheets within the same spreadsheet (for example, `Sheet2!A1:C4`) or retrieve multiple ranges at once (for example, `?ranges=A1:D5&ranges=Sheet2!A1:C4`). Limiting the range returns only the portions of the spreadsheet that intersect the requested ranges.
*/
await gapi.client.sheets.spreadsheets.get({spreadsheetId: 'spreadsheetId'});

/*
Returns the spreadsheet at the given ID. The caller must specify the spreadsheet ID. This method differs from GetSpreadsheet in that it allows selecting which subsets of spreadsheet data to return by specifying a dataFilters parameter. Multiple DataFilters can be specified. Specifying one or more data filters returns the portions of the spreadsheet that intersect ranges matched by any of the filters. By default, data within grids is not returned. You can include grid data one of 2 ways: * Specify a [field mask](https://developers.google.com/workspace/sheets/api/guides/field-masks) listing your desired fields using the `fields` URL parameter in HTTP * Set the includeGridData parameter to true. If a field mask is set, the `includeGridData` parameter is ignored For large spreadsheets, as a best practice, retrieve only the specific spreadsheet fields that you want.
*/
await gapi.client.sheets.spreadsheets.getByDataFilter({
  spreadsheetId: 'spreadsheetId',
});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.sheets-v4#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
