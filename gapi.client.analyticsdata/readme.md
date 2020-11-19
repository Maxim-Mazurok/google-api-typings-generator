# TypeScript typings for Google Analytics Data API v1alpha

Accesses report data in Google Analytics.
For detailed description please check [documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/).

## Installing

Install typings for Google Analytics Data API:

```
npm install @types/gapi.client.analyticsdata@v1alpha --save-dev
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
gapi.client.load('analyticsdata', 'v1alpha', () => {
  // now we can use gapi.client.analyticsdata
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your Google Analytics data
      'https://www.googleapis.com/auth/analytics',

      // View your Google Analytics data
      'https://www.googleapis.com/auth/analytics.readonly',
    ],
    immediate = true;
// ...

gapi.auth.authorize(
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Google Analytics Data API resources:

```typescript

/*
Returns metadata for dimensions and metrics available in reporting methods. Used to explore the dimensions and metrics. In this method, a Google Analytics GA4 Property Identifier is specified in the request, and the metadata response includes Custom dimensions and metrics as well as Universal metadata. For example if a custom metric with parameter name `levels_unlocked` is registered to a property, the Metadata response will contain `customEvent:levels_unlocked`. Universal metadata are dimensions and metrics applicable to any property such as `country` and `totalUsers`.
*/
await gapi.client.analyticsdata.properties.getMetadata({ name: "name",  });

/*
The Google Analytics Realtime API returns a customized report of realtime event data for your property. These reports show events and usage from the last 30 minutes.
*/
await gapi.client.analyticsdata.properties.runRealtimeReport({ property: "property",  });

/*
Returns multiple pivot reports in a batch. All reports must be for the same Entity.
*/
await gapi.client.analyticsdata.v1alpha.batchRunPivotReports({  });

/*
Returns multiple reports in a batch. All reports must be for the same Entity.
*/
await gapi.client.analyticsdata.v1alpha.batchRunReports({  });

/*
Returns a customized pivot report of your Google Analytics event data. Pivot reports are more advanced and expressive formats than regular reports. In a pivot report, dimensions are only visible if they are included in a pivot. Multiple pivots can be specified to further dissect your data.
*/
await gapi.client.analyticsdata.v1alpha.runPivotReport({  });

/*
Returns a customized report of your Google Analytics event data. Reports contain statistics derived from data collected by the Google Analytics tracking code. The data returned from the API is as a table with columns for the requested dimensions and metrics. Metrics are individual measurements of user activity on your property, such as active users or event count. Dimensions break down metrics across some common criteria, such as country or event name.
*/
await gapi.client.analyticsdata.v1alpha.runReport({  });
```
