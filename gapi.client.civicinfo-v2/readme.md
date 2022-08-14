# TypeScript typings for Google Civic Information API v2

Provides polling places, early vote locations, contest data, election officials, and government representatives for U.S. residential addresses.
For detailed description please check [documentation](https://developers.google.com/civic-information/).

## Installing

Install typings for Google Civic Information API:

```
npm install @types/gapi.client.civicinfo-v2 --save-dev
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
gapi.client.load('https://civicinfo.googleapis.com/$discovery/rest?version=v2', () => {
  // now we can use:
  // gapi.client.civicinfo
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('civicinfo', 'v2', () => {
  // now we can use:
  // gapi.client.civicinfo
});
```



After that you can use Google Civic Information API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Searches for political divisions by their natural name or OCD ID.
*/
await gapi.client.civicinfo.divisions.search({  });

/*
List of available elections to query.
*/
await gapi.client.civicinfo.elections.electionQuery({  });

/*
Looks up information relevant to a voter based on the voter's registered address.
*/
await gapi.client.civicinfo.elections.voterInfoQuery({ address: "address",  });

/*
Looks up political geography and representative information for a single address.
*/
await gapi.client.civicinfo.representatives.representativeInfoByAddress({  });

/*
Looks up representative information for a single geographic division.
*/
await gapi.client.civicinfo.representatives.representativeInfoByDivision({ ocdId: "ocdId",  });
```
