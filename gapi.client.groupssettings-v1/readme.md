# TypeScript typings for Groups Settings API v1

Manages permission levels and related settings of a group.
For detailed description please check [documentation](https://developers.google.com/google-apps/groups-settings/get_started).

## Installing

Install typings for Groups Settings API:

```
npm install @types/gapi.client.groupssettings-v1 --save-dev
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
  'https://groupssettings.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.groupsSettings
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('groupssettings', 'v1', () => {
  // now we can use:
  // gapi.client.groupsSettings
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // View and manage the settings of a G Suite group
    'https://www.googleapis.com/auth/apps.groups.settings',
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

After that you can use Groups Settings API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets one resource by id.
*/
await gapi.client.groupsSettings.groups.get({groupUniqueId: 'groupUniqueId'});

/*
Updates an existing resource. This method supports patch semantics.
*/
await gapi.client.groupsSettings.groups.patch({groupUniqueId: 'groupUniqueId'});

/*
Updates an existing resource.
*/
await gapi.client.groupsSettings.groups.update({
  groupUniqueId: 'groupUniqueId',
});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.groupssettings-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
