# TypeScript typings for Gemini Enterprise for Customer Experience API v1

For detailed description please check [documentation](https://cloud.google.com/customer-engagement-ai/conversational-agents/ps/reference).

## Installing

Install typings for Gemini Enterprise for Customer Experience API:

```
npm install @types/gapi.client.ces-v1 --save-dev
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
  'https://ces.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.ces
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('ces', 'v1', () => {
  // now we can use:
  // gapi.client.ces
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Create, update, delete, and manage your Next Gen Agents
    'https://www.googleapis.com/auth/ces',

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

After that you can use Gemini Enterprise for Customer Experience API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.ces-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
