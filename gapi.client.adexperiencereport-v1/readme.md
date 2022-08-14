# TypeScript typings for Ad Experience Report API v1

Views Ad Experience Report data, and gets a list of sites that have a significant number of annoying ads.
For detailed description please check [documentation](https://developers.google.com/ad-experience-report/).

## Installing

Install typings for Ad Experience Report API:

```
npm install @types/gapi.client.adexperiencereport-v1 --save-dev
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
gapi.client.load('https://adexperiencereport.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.adexperiencereport
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('adexperiencereport', 'v1', () => {
  // now we can use:
  // gapi.client.adexperiencereport
});
```



After that you can use Ad Experience Report API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Gets a site's Ad Experience Report summary.
*/
await gapi.client.adexperiencereport.sites.get({ name: "name",  });

/*
Lists sites that are failing in the Ad Experience Report on at least one platform.
*/
await gapi.client.adexperiencereport.violatingSites.list({  });
```
