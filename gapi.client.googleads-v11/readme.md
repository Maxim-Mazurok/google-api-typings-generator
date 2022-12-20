# TypeScript typings for Google Ads API v11

Manage your Google Ads accounts, campaigns, and reports with this API.
For detailed description please check [documentation](https://developers.google.com/google-ads/api/).

## Installing

Install typings for Google Ads API:

```
npm install @types/gapi.client.googleads-v11 --save-dev
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
gapi.client.load('https://googleads.googleapis.com/$discovery/rest?version=v11', () => {
  // now we can use:
  // gapi.client.googleads
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('googleads', 'v11', () => {
  // now we can use:
  // gapi.client.googleads
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, create, and delete your Google Ads accounts and data.
      'https://www.googleapis.com/auth/adwords',
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

After that you can use Google Ads API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Creates a new client under manager. The new client customer is returned. List of thrown errors: [AccessInvitationError]() [AuthenticationError]() [AuthorizationError]() [CurrencyCodeError]() [HeaderError]() [InternalError]() [ManagerLinkError]() [QuotaError]() [RequestError]() [StringLengthError]() [TimeZoneError]()
*/
await gapi.client.googleads.customers.createCustomerClient({ customerId: "customerId",  });

/*
Returns a list of suggested AdGroups and suggested modifications (text, match type) for the given keywords. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [CollectionSizeError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.customers.generateAdGroupThemes({ customerId: "customerId",  });

/*
Returns a collection of attributes that are represented in an audience of interest, with metrics that compare each attribute's share of the audience with its share of a baseline audience. List of thrown errors: [AudienceInsightsError]() [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [RequestError]()
*/
await gapi.client.googleads.customers.generateAudienceCompositionInsights({ customerId: "customerId",  });

/*
Creates a saved report that can be viewed in the Insights Finder tool. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [RequestError]()
*/
await gapi.client.googleads.customers.generateInsightsFinderReport({ customerId: "customerId",  });

/*
Returns a list of keyword historical metrics. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [CollectionSizeError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.customers.generateKeywordHistoricalMetrics({ customerId: "customerId",  });

/*
Returns a list of keyword ideas. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [CollectionSizeError]() [HeaderError]() [InternalError]() [KeywordPlanIdeaError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.customers.generateKeywordIdeas({ customerId: "customerId",  });

/*
Generates a product mix ideas given a set of preferences. This method helps the advertiser to obtain a good mix of ad formats and budget allocations based on its preferences. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [ReachPlanError]() [RequestError]()
*/
await gapi.client.googleads.customers.generateProductMixIdeas({ customerId: "customerId",  });

/*
Generates a reach forecast for a given targeting / product mix. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [ReachPlanError]() [RequestError]()
*/
await gapi.client.googleads.customers.generateReachForecast({ customerId: "customerId",  });

/*
Returns resource names of customers directly accessible by the user authenticating the call. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.customers.listAccessibleCustomers({  });

/*
Updates a customer. Operation statuses are returned. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [DatabaseError]() [FieldMaskError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]() [UrlFieldError]()
*/
await gapi.client.googleads.customers.mutate({ customerId: "customerId",  });

/*
Searches for audience attributes that can be used to generate insights. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [RequestError]()
*/
await gapi.client.googleads.customers.searchAudienceInsightsAttributes({ customerId: "customerId",  });

/*
Suggests keyword themes to advertise on.
*/
await gapi.client.googleads.customers.suggestKeywordThemes({ customerId: "customerId",  });

/*
Suggests a Smart campaign ad compatible with the Ad family of resources, based on data points such as targeting and the business to advertise.
*/
await gapi.client.googleads.customers.suggestSmartCampaignAd({ customerId: "customerId",  });

/*
Returns BudgetOption suggestions.
*/
await gapi.client.googleads.customers.suggestSmartCampaignBudgetOptions({ customerId: "customerId",  });

/*
Processes the given call conversions. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [PartialFailureError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.customers.uploadCallConversions({ customerId: "customerId",  });

/*
Processes the given click conversions. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [ConversionUploadError]() [HeaderError]() [InternalError]() [PartialFailureError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.customers.uploadClickConversions({ customerId: "customerId",  });

/*
Processes the given conversion adjustments. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [PartialFailureError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.customers.uploadConversionAdjustments({ customerId: "customerId",  });

/*
Uploads the given user data. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [CollectionSizeError]() [FieldError]() [HeaderError]() [InternalError]() [MutateError]() [OfflineUserDataJobError]() [QuotaError]() [RequestError]() [UserDataError]()
*/
await gapi.client.googleads.customers.uploadUserData({ customerId: "customerId",  });

/*
Returns GeoTargetConstant suggestions by location name or by resource name. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [GeoTargetConstantSuggestionError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.geoTargetConstants.suggest({  });

/*
Returns just the requested field. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.googleAdsFields.get({ resourceName: "resourceName",  });

/*
Returns all fields that match the search query. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QueryError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.googleAdsFields.search({  });

/*
Returns KeywordThemeConstant suggestions by keyword themes. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.keywordThemeConstants.suggest({  });

/*
Returns the list of plannable locations (for example, countries). List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.listPlannableLocations({  });

/*
Returns the list of per-location plannable YouTube ad formats with allowed targeting. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.listPlannableProducts({  });
```
