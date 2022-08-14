# TypeScript typings for Google Analytics Data API v1beta

Accesses report data in Google Analytics.
For detailed description please check [documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/).

## Installing

Install typings for Google Analytics Data API:

```
npm install @types/gapi.client.analyticsdata-v1beta --save-dev
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
gapi.client.load('https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta', () => {
  // now we can use:
  // gapi.client.analyticsdata
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('analyticsdata', 'v1beta', () => {
  // now we can use:
  // gapi.client.analyticsdata
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // View and manage your Google Analytics data
      'https://www.googleapis.com/auth/analytics',

      // See and download your Google Analytics data
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

After that you can use Google Analytics Data API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Returns multiple pivot reports in a batch. All reports must be for the same GA4 Property.
*/
await gapi.client.analyticsdata.properties.batchRunPivotReports({ property: "property",  });

/*
Returns multiple reports in a batch. All reports must be for the same GA4 Property.
*/
await gapi.client.analyticsdata.properties.batchRunReports({ property: "property",  });

/*
This compatibility method lists dimensions and metrics that can be added to a report request and maintain compatibility. This method fails if the request's dimensions and metrics are incompatible. In Google Analytics, reports fail if they request incompatible dimensions and/or metrics; in that case, you will need to remove dimensions and/or metrics from the incompatible report until the report is compatible. The Realtime and Core reports have different compatibility rules. This method checks compatibility for Core reports.
*/
await gapi.client.analyticsdata.properties.checkCompatibility({ property: "property",  });

/*
Returns metadata for dimensions and metrics available in reporting methods. Used to explore the dimensions and metrics. In this method, a Google Analytics GA4 Property Identifier is specified in the request, and the metadata response includes Custom dimensions and metrics as well as Universal metadata. For example if a custom metric with parameter name `levels_unlocked` is registered to a property, the Metadata response will contain `customEvent:levels_unlocked`. Universal metadata are dimensions and metrics applicable to any property such as `country` and `totalUsers`.
*/
await gapi.client.analyticsdata.properties.getMetadata({ name: "name",  });

/*
Returns a customized pivot report of your Google Analytics event data. Pivot reports are more advanced and expressive formats than regular reports. In a pivot report, dimensions are only visible if they are included in a pivot. Multiple pivots can be specified to further dissect your data.
*/
await gapi.client.analyticsdata.properties.runPivotReport({ property: "property",  });

/*
Returns a customized report of realtime event data for your property. Events appear in realtime reports seconds after they have been sent to the Google Analytics. Realtime reports show events and usage data for the periods of time ranging from the present moment to 30 minutes ago (up to 60 minutes for Google Analytics 360 properties). For a guide to constructing realtime requests & understanding responses, see [Creating a Realtime Report](https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-basics).
*/
await gapi.client.analyticsdata.properties.runRealtimeReport({ property: "property",  });

/*
Returns a customized report of your Google Analytics event data. Reports contain statistics derived from data collected by the Google Analytics tracking code. The data returned from the API is as a table with columns for the requested dimensions and metrics. Metrics are individual measurements of user activity on your property, such as active users or event count. Dimensions break down metrics across some common criteria, such as country or event name. For a guide to constructing requests & understanding responses, see [Creating a Report](https://developers.google.com/analytics/devguides/reporting/data/v1/basics).
*/
await gapi.client.analyticsdata.properties.runReport({ property: "property",  });
```
