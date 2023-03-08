# TypeScript typings for Business Profile Performance API v1

The Business Profile Performance API allows merchants to fetch performance reports about their business profile on Google. Note - If you have a quota of 0 after enabling the API, please request for GBP API access.
For detailed description please check [documentation](https://developers.google.com/my-business/).

## Installing

Install typings for Business Profile Performance API:

```
npm install @types/gapi.client.businessprofileperformance-v1 --save-dev
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
gapi.client.load('https://businessprofileperformance.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.businessprofileperformance
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('businessprofileperformance', 'v1', () => {
  // now we can use:
  // gapi.client.businessprofileperformance
});
```



After that you can use Business Profile Performance API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
 Returns the values for each date from a given time range and optionally the sub entity type, where applicable, that are associated with the specific daily metrics. Example request: `GET https://businessprofileperformance.googleapis.com/v1/locations/12345:fetchMultiDailyMetricsTimeSeries?dailyMetrics=WEBSITE_CLICKS&dailyMetrics=CALL_CLICKS&daily_range.start_date.year=2022&daily_range.start_date.month=1&daily_range.start_date.day=1&daily_range.end_date.year=2022&daily_range.end_date.month=3&daily_range.end_date.day=31`
*/
await gapi.client.businessprofileperformance.locations.fetchMultiDailyMetricsTimeSeries({ location: "location",  });

/*
 Returns the values for each date from a given time range that are associated with the specific daily metric. Example request: `GET https://businessprofileperformance.googleapis.com/v1/locations/12345:getDailyMetricsTimeSeries?dailyMetric=WEBSITE_CLICKS&daily_range.start_date.year=2022&daily_range.start_date.month=1&daily_range.start_date.day=1&daily_range.end_date.year=2022&daily_range.end_date.month=3&daily_range.end_date.day=31`
*/
await gapi.client.businessprofileperformance.locations.getDailyMetricsTimeSeries({ name: "name",  });
```
