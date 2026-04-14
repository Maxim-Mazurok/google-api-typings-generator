# TypeScript typings for Search Ads 360 Reporting API v23

The Search Ads 360 API allows developers to automate downloading reports from Search Ads 360.
For detailed description please check [documentation](https://developers.google.com/search-ads/reporting).

## Installing

Install typings for Search Ads 360 Reporting API:

```
npm install @types/gapi.client.searchads360-v23 --save-dev
```

## TypeScript 6.0+

TypeScript 6.0 changed `types` to default to `[]`. You must now explicitly list type packages in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "gapi",
      "gapi.auth2",
      "gapi.client",
      "gapi.client.searchads360-v23"
    ]
  }
}
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
gapi.client.load(
  'https://searchads360.googleapis.com/$discovery/rest?version=v23',
  () => {
    // now we can use:
    // gapi.client.searchads360
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('searchads360', 'v23', () => {
  // now we can use:
  // gapi.client.searchads360
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // View and manage your advertising data in DoubleClick Search
    'https://www.googleapis.com/auth/doubleclicksearch',
  ],
  immediate = true;
// ...

gapi.auth.authorize(
  {client_id: client_id, scope: scope, immediate: immediate},
  authResult => {
    if (authResult && !authResult.error) {
      /* handle successful authorization */
    } else {
      /* handle authorization error */
    }
  },
);
```

After that you can use Search Ads 360 Reporting API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Lists date ranges for which audience insights data can be requested. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [RequestError]()
*/
await gapi.client.searchads360.audienceInsights.listInsightsEligibleDates({});

/*
Creates a new client under manager. The new client customer is returned. List of thrown errors: [AccessInvitationError]() [AuthenticationError]() [AuthorizationError]() [CurrencyCodeError]() [HeaderError]() [InternalError]() [ManagerLinkError]() [QuotaError]() [RequestError]() [StringLengthError]() [TimeZoneError]()
*/
await gapi.client.searchads360.customers.createCustomerClient({
  customerId: 'customerId',
});

/*
Returns a list of suggested AdGroups and suggested modifications (text, match type) for the given keywords. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [CollectionSizeError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateAdGroupThemes({
  customerId: 'customerId',
});

/*
Returns a collection of attributes that are represented in an audience of interest, with metrics that compare each attribute's share of the audience with its share of a baseline audience. List of thrown errors: [AudienceInsightsError]() [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateAudienceCompositionInsights({
  customerId: 'customerId',
});

/*
Returns a collection of audience attributes using generative AI based on the provided audience description. List of thrown errors: [AudienceInsightsError]() [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateAudienceDefinition({
  customerId: 'customerId',
});

/*
Returns a collection of audience attributes along with estimates of the overlap between their potential YouTube reach and that of a given input attribute. List of thrown errors: [AudienceInsightsError]() [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateAudienceOverlapInsights({
  customerId: 'customerId',
});

/*
Returns YouTube advertisement metrics for the given client against industry benchmarks. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [BenchmarksError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateBenchmarksMetrics({
  customerId: 'customerId',
});

/*
Creates a saved report that can be viewed in the Insights Finder tool. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateInsightsFinderReport({
  customerId: 'customerId',
});

/*
Returns metrics (such as impressions, clicks, total cost) of a keyword forecast for the given campaign. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [CollectionSizeError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateKeywordForecastMetrics({
  customerId: 'customerId',
});

/*
Returns a list of keyword historical metrics. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [CollectionSizeError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateKeywordHistoricalMetrics({
  customerId: 'customerId',
});

/*
Returns a list of keyword ideas. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [CollectionSizeError]() [HeaderError]() [InternalError]() [KeywordPlanIdeaError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateKeywordIdeas({
  customerId: 'customerId',
});

/*
Generates a reach forecast for a given targeting / product mix. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [ReachPlanError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateReachForecast({
  customerId: 'customerId',
});

/*
Returns a collection of targeting insights (e.g. targetable audiences) that are relevant to the requested audience. List of thrown errors: [AudienceInsightsError]() [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateSuggestedTargetingInsights({
  customerId: 'customerId',
});

/*
Returns potential reach metrics for targetable audiences. This method helps answer questions like "How many Men aged 18+ interested in Camping can be reached on YouTube?" List of thrown errors: [AudienceInsightsError]() [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [RequestError]()
*/
await gapi.client.searchads360.customers.generateTargetingSuggestionMetrics({
  customerId: 'customerId',
});

/*
Returns Identity Verification information. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.getIdentityVerification({
  customerId: 'customerId',
});

/*
Returns resource names of customers directly accessible by the user authenticating the call. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.listAccessibleCustomers({});

/*
Updates a customer. Operation statuses are returned. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [DatabaseError]() [FieldMaskError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]() [UrlFieldError]()
*/
await gapi.client.searchads360.customers.mutate({customerId: 'customerId'});

/*
Removes automatically created assets from a campaign. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [ContextError]() [FieldError]() [InternalError]() [MutateError]() [PartialFailureError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.removeCampaignAutomaticallyCreatedAsset(
  {customerId: 'customerId'},
);

/*
Searches for audience attributes that can be used to generate insights. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [RequestError]()
*/
await gapi.client.searchads360.customers.searchAudienceInsightsAttributes({
  customerId: 'customerId',
});

/*
Starts Identity Verification for a given verification program type. Statuses are returned. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.startIdentityVerification({
  customerId: 'customerId',
});

/*
Suggests keyword themes to advertise on.
*/
await gapi.client.searchads360.customers.suggestKeywordThemes({
  customerId: 'customerId',
});

/*
Suggests a Smart campaign ad compatible with the Ad family of resources, based on data points such as targeting and the business to advertise.
*/
await gapi.client.searchads360.customers.suggestSmartCampaignAd({
  customerId: 'customerId',
});

/*
Returns BudgetOption suggestions.
*/
await gapi.client.searchads360.customers.suggestSmartCampaignBudgetOptions({
  customerId: 'customerId',
});

/*
Returns Travel Asset suggestions. Asset suggestions are returned on a best-effort basis. There are no guarantees that all possible asset types will be returned for any given hotel property.
*/
await gapi.client.searchads360.customers.suggestTravelAssets({
  customerId: 'customerId',
});

/*
Uploads the given user data. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [CollectionSizeError]() [FieldError]() [HeaderError]() [InternalError]() [MutateError]() [OfflineUserDataJobError]() [QuotaError]() [RequestError]() [UserDataError]()
*/
await gapi.client.searchads360.customers.uploadUserData({
  customerId: 'customerId',
});

/*
Returns GeoTargetConstant suggestions by location name or by resource name. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [GeoTargetConstantSuggestionError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.geoTargetConstants.suggest({});

/*
Returns incentives for a given user.
*/
await gapi.client.searchads360.incentives.fetchIncentive({});

/*
Returns KeywordThemeConstant suggestions by keyword themes. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.keywordThemeConstants.suggest({});

/*
Returns just the requested field. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.searchAds360Fields.get({
  resourceName: 'resourceName',
});

/*
Returns all fields that match the search [query](/search-ads/reporting/concepts/field-service#use_a_query_to_get_field_details). List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QueryError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.searchAds360Fields.search({});

/*
Returns a collection of conversion rate suggestions for supported plannable products. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.generateConversionRates({});

/*
Returns a date range that supports benchmarks. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.listBenchmarksAvailableDates({});

/*
Returns the list of locations that support benchmarks (for example, countries). List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.listBenchmarksLocations({});

/*
Returns the list of products that supports benchmarks. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.listBenchmarksProducts({});

/*
Returns the list of benchmarks sources (for example, Industry Verticals). List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.listBenchmarksSources({});

/*
Returns the list of plannable locations (for example, countries). List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.listPlannableLocations({});

/*
Returns the list of per-location plannable YouTube ad formats with allowed targeting. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.listPlannableProducts({});

/*
Returns the list of plannable user interests. A plannable user interest is one that can be targeted in a reach forecast using ReachPlanService.GenerateReachForecast. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [ListOperationError]() [QuotaError]() [RequestError]() [StringLengthError]()
*/
await gapi.client.searchads360.listPlannableUserInterests({});

/*
Returns the list of plannable user lists with their plannable status. User lists may not be plannable for a number of reasons, including: - They are less than 10 days old. - They have a membership lifespan that is less than 30 days - They have less than 10,000 or more than 700,000 users. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [FieldError]() [HeaderError]() [InternalError]() [QuotaError]() [RangeError]() [ReachPlanError]() [RequestError]()
*/
await gapi.client.searchads360.listPlannableUserLists({});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.searchads360-v23#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
