# TypeScript typings for Safe Browsing API v4

Enables client applications to check web resources (most commonly URLs) against Google-generated lists of unsafe web resources. The Safe Browsing APIs are for non-commercial use only. If you need to use APIs to detect malicious URLs for commercial purposes – meaning “for sale or revenue-generating purposes” – please refer to the Web Risk API.
For detailed description please check [documentation](https://developers.google.com/safe-browsing/).

## Installing

Install typings for Safe Browsing API:

```
npm install @types/gapi.client.safebrowsing@v4 --save-dev
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
gapi.client.load('safebrowsing', 'v4', () => {
  // now we can use gapi.client.safebrowsing
  // ...
});
```



After that you can use Safe Browsing API resources:

```typescript

/*

*/
await gapi.client.safebrowsing.encodedFullHashes.get({ encodedRequest: "encodedRequest",  });

/*

*/
await gapi.client.safebrowsing.encodedUpdates.get({ encodedRequest: "encodedRequest",  });

/*
Finds the full hashes that match the requested hash prefixes.
*/
await gapi.client.safebrowsing.fullHashes.find({  });

/*
Reports a Safe Browsing threat list hit to Google. Only projects with TRUSTED_REPORTER visibility can use this method.
*/
await gapi.client.safebrowsing.threatHits.create({  });

/*
Lists the Safe Browsing threat lists available for download.
*/
await gapi.client.safebrowsing.threatLists.list({  });

/*
Fetches the most recent threat list updates. A client can request updates for multiple lists at once.
*/
await gapi.client.safebrowsing.threatListUpdates.fetch({  });

/*
Finds the threat entries that match the Safe Browsing lists.
*/
await gapi.client.safebrowsing.threatMatches.find({  });
```
