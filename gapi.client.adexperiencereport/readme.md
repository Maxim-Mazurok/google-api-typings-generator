# TypeScript typings for Ad Experience Report API v1

Views Ad Experience Report data, and gets a list of sites that have a significant number of annoying ads.
For detailed description please check [documentation](https://developers.google.com/ad-experience-report/).

## Installing

Install typings for Ad Experience Report API:

```
npm install @types/gapi.client.adexperiencereport@v1 --save-dev
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
gapi.client.load('adexperiencereport', 'v1', () => {
  // now we can use gapi.client.adexperiencereport
  // ...
});
```



After that you can use Ad Experience Report API resources:

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
