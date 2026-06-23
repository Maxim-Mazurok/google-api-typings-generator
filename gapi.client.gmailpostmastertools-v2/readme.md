# TypeScript typings for Gmail Postmaster Tools API v2

The Postmaster Tools API is a RESTful API that provides programmatic access to email traffic metrics (like spam reports, delivery errors etc) otherwise available through the Gmail Postmaster Tools UI currently.
For detailed description please check [documentation](https://developers.google.com/workspace/gmail/postmaster).

## Installing

Install typings for Gmail Postmaster Tools API:

```
npm install @types/gapi.client.gmailpostmastertools-v2 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "gapi",
      "gapi.auth2",
      "gapi.client",
      "gapi.client.gmailpostmastertools-v2"
    ]
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
  'https://gmailpostmastertools.googleapis.com/$discovery/rest?version=v2',
  () => {
    // now we can use:
    // gapi.client.gmailpostmastertools
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('gmailpostmastertools', 'v2', () => {
  // now we can use:
  // gapi.client.gmailpostmastertools
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Get email traffic metrics, manage domains, and manage domain users for the domains you have registered with Postmaster Tools
    'https://www.googleapis.com/auth/postmaster',

    // View and manage the domains you have registered with Postmaster Tools
    'https://www.googleapis.com/auth/postmaster.domain',

    // Get email traffic metrics for the domains you have registered with Postmaster Tools
    'https://www.googleapis.com/auth/postmaster.traffic.readonly',

    // View and manage users for the domains you have registered with Postmaster Tools
    'https://www.googleapis.com/auth/postmaster.user',
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

After that you can use Gmail Postmaster Tools API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
[Developer Preview](https://developers.google.com/workspace/preview): Adds a domain to the user's account. Returns INVALID_ARGUMENT if a domain is not provided. Returns ALREADY_EXISTS if the domain is already registered by the user.
*/
await gapi.client.gmailpostmastertools.domains.create({});

/*
[Developer Preview](https://developers.google.com/workspace/preview): Deletes a domain from the user's account. Returns NOT_FOUND if the domain is not registered by the user.
*/
await gapi.client.gmailpostmastertools.domains.delete({name: 'name'});

/*
Retrieves detailed information about a domain registered by you. Returns NOT_FOUND if the domain is not registered by you. Domain represents the metadata of a domain that has been registered within the system and linked to a user.
*/
await gapi.client.gmailpostmastertools.domains.get({name: 'name'});

/*
Retrieves the compliance status for a given domain. Returns PERMISSION_DENIED if you don't have permission to access compliance status for the domain.
*/
await gapi.client.gmailpostmastertools.domains.getComplianceStatus({
  name: 'name',
});

/*
[Developer Preview](https://developers.google.com/workspace/preview): Gets a verification token used for verifying a user's ownership over a domain.
*/
await gapi.client.gmailpostmastertools.domains.getVerificationToken({
  name: 'name',
});

/*
Retrieves a list of all domains registered by you, along with their corresponding metadata. The order of domains in the response is unspecified and non-deterministic. Newly registered domains will not necessarily be added to the end of this list.
*/
await gapi.client.gmailpostmastertools.domains.list({});

/*
[Developer Preview](https://developers.google.com/workspace/preview): Verifies a user's ownership of a domain at the DNS level. Note that this is distinct from checking if the user has OWNER status within IRDB.
*/
await gapi.client.gmailpostmastertools.domains.verify({name: 'name'});

/*
Executes a batch of QueryDomainStats requests for multiple domains. Returns PERMISSION_DENIED if you don't have permission to access DomainStats for any of the requested domains.
*/
await gapi.client.gmailpostmastertools.domainStats.batchQuery({});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.gmailpostmastertools-v2#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
