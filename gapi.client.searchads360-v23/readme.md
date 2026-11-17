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
Creates a new client under manager. The new client customer is returned. List of thrown errors: [AccessInvitationError]() [AuthenticationError]() [AuthorizationError]() [CurrencyCodeError]() [HeaderError]() [InternalError]() [ManagerLinkError]() [QuotaError]() [RequestError]() [StringLengthError]() [TimeZoneError]()
*/
await gapi.client.searchads360.customers.createCustomerClient({
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
Returns Travel Asset suggestions. Asset suggestions are returned on a best-effort basis. There are no guarantees that all possible asset types will be returned for any given hotel property.
*/
await gapi.client.searchads360.customers.suggestTravelAssets({
  customerId: 'customerId',
});

/*
Processes the given call conversions. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [PartialFailureError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.uploadCallConversions({
  customerId: 'customerId',
});

/*
Processes the given click conversions. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [ConversionUploadError]() [HeaderError]() [InternalError]() [PartialFailureError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.uploadClickConversions({
  customerId: 'customerId',
});

/*
Processes the given conversion adjustments. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [PartialFailureError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.customers.uploadConversionAdjustments({
  customerId: 'customerId',
});

/*
Returns GeoTargetConstant suggestions by location name or by resource name. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [GeoTargetConstantSuggestionError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.geoTargetConstants.suggest({});

/*
Returns just the requested field. List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.searchAds360Fields.get({
  resourceName: 'resourceName',
});

/*
Returns all fields that match the search [query](https://developers.google.com/search-ads/reporting/concepts/field-service#use_a_query_to_get_field_details). List of thrown errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]() [InternalError]() [QueryError]() [QuotaError]() [RequestError]()
*/
await gapi.client.searchads360.searchAds360Fields.search({});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.searchads360-v23#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
