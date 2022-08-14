# TypeScript typings for Google Ads API v8

Manage your Google Ads accounts, campaigns, and reports with this API.
For detailed description please check [documentation](https://developers.google.com/google-ads/api/).

## Installing

Install typings for Google Ads API:

```
npm install @types/gapi.client.googleads-v8 --save-dev
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
gapi.client.load('https://googleads.googleapis.com/$discovery/rest?version=v8', () => {
  // now we can use:
  // gapi.client.googleads
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('googleads', 'v8', () => {
  // now we can use:
  // gapi.client.googleads
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Manage your AdWords campaigns
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
Returns the requested carrier constant in full detail. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.carrierConstants.get({ resourceName: "resourceName",  });

/*
Returns the requested currency constant. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.currencyConstants.get({ resourceName: "resourceName",  });

/*
Creates a new client under manager. The new client customer is returned. List of thrown errors: [AccessInvitationError]() [AuthenticationError]() [AuthorizationError]() [CurrencyCodeError]() [HeaderError]() [InternalError]() [ManagerLinkError]() [QuotaError]() [RequestError]() [StringLengthError]() [TimeZoneError]()
*/
await gapi.client.googleads.customers.createCustomerClient({ customerId: "customerId",  });

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
Returns the requested customer in full detail. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.customers.get({ resourceName: "resourceName",  });

/*
Returns the requested Hotel Performance View in full detail. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.customers.getHotelPerformanceView({ resourceName: "resourceName",  });

/*
Returns the requested Shopping performance view in full detail. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.customers.getShoppingPerformanceView({ resourceName: "resourceName",  });

/*
Returns resource names of customers directly accessible by the user authenticating the call. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.customers.listAccessibleCustomers({  });

/*
Updates a customer. Operation statuses are returned. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [DatabaseError]() [FieldMaskError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]() [UrlFieldError]()
*/
await gapi.client.googleads.customers.mutate({ customerId: "customerId",  });

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
Returns the requested geo target constant in full detail. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.geoTargetConstants.get({ resourceName: "resourceName",  });

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
Returns the requested keyword theme constant in full detail.
*/
await gapi.client.googleads.keywordThemeConstants.get({ resourceName: "resourceName",  });

/*
Returns KeywordThemeConstant suggestions by keyword themes. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.keywordThemeConstants.suggest({  });

/*
Returns the requested language constant. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.languageConstants.get({ resourceName: "resourceName",  });

/*
Returns the requested mobile app category constant. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.mobileAppCategoryConstants.get({ resourceName: "resourceName",  });

/*
Returns the requested mobile device constant in full detail. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.mobileDeviceConstants.get({ resourceName: "resourceName",  });

/*
Returns the requested OS version constant in full detail. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.operatingSystemVersionConstants.get({ resourceName: "resourceName",  });

/*
Returns the requested Product Bidding Category in full detail. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.productBiddingCategoryConstants.get({ resourceName: "resourceName",  });

/*
Returns the requested topic constant in full detail. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.topicConstants.get({ resourceName: "resourceName",  });

/*
Returns the list of plannable locations (for example, countries). List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.listPlannableLocations({  });

/*
Returns the list of per-location plannable YouTube ad formats with allowed targeting. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.googleads.listPlannableProducts({  });
```
