# TypeScript typings for Local Services API v1


For detailed description please check [documentation](https://ads.google.com/local-services-ads/).

## Installing

Install typings for Local Services API:

```
npm install @types/gapi.client.localservices@v1 --save-dev
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
gapi.client.load('localservices', 'v1', () => {
  // now we can use gapi.client.localservices
  // ...
});
```



After that you can use Local Services API resources:

```typescript

/*
Get account reports containing aggregate account data of all linked GLS accounts. Caller needs to provide their manager customer id and the associated auth credential that allows them read permissions on their linked accounts.
*/
await gapi.client.localservices.accountReports.search({  });

/*
Get detailed lead reports containing leads that have been received by all linked GLS accounts. Caller needs to provide their manager customer id and the associated auth credential that allows them read permissions on their linked accounts.
*/
await gapi.client.localservices.detailedLeadReports.search({  });
```
