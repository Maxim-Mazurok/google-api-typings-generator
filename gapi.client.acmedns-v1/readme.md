# TypeScript typings for ACME DNS API v1

Google Domains ACME DNS API that allows users to complete ACME DNS-01 challenges for a domain.
For detailed description please check [documentation](https://developers.google.com/domains/acme-dns/).

## Installing

Install typings for ACME DNS API:

```
npm install @types/gapi.client.acmedns-v1 --save-dev
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
gapi.client.load('https://acmedns.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.acmedns
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('acmedns', 'v1', () => {
  // now we can use:
  // gapi.client.acmedns
});
```



After that you can use ACME DNS API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets the ACME challenge set for a given domain name. Domain names must be provided in Punycode.
*/
await gapi.client.acmedns.acmeChallengeSets.get({ rootDomain: "rootDomain",  });

/*
Rotate the ACME challenges for a given domain name. By default, removes any challenges that are older than 30 days. Domain names must be provided in Punycode.
*/
await gapi.client.acmedns.acmeChallengeSets.rotateChallenges({ rootDomain: "rootDomain",  });
```
