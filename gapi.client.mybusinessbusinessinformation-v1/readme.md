# TypeScript typings for My Business Business Information API v1

The My Business Business Information API provides an interface for managing business information on Google.
For detailed description please check [documentation](https://developers.google.com/my-business/).

## Installing

Install typings for My Business Business Information API:

```
npm install @types/gapi.client.mybusinessbusinessinformation-v1 --save-dev
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
gapi.client.load('https://mybusinessbusinessinformation.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.mybusinessbusinessinformation
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('mybusinessbusinessinformation', 'v1', () => {
  // now we can use:
  // gapi.client.mybusinessbusinessinformation
});
```



After that you can use My Business Business Information API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Returns the list of attributes that would be available for a location with the given primary category and country.
*/
await gapi.client.mybusinessbusinessinformation.attributes.list({  });

/*
Returns a list of business categories for the provided language and GConcept ids.
*/
await gapi.client.mybusinessbusinessinformation.categories.batchGet({  });

/*
Returns a list of business categories. Search will match the category name but not the category ID. Search only matches the front of a category name (that is, 'food' may return 'Food Court' but not 'Fast Food Restaurant').
*/
await gapi.client.mybusinessbusinessinformation.categories.list({  });

/*
Gets the specified chain. Returns `NOT_FOUND` if the chain does not exist.
*/
await gapi.client.mybusinessbusinessinformation.chains.get({ name: "name",  });

/*
Searches the chain based on chain name.
*/
await gapi.client.mybusinessbusinessinformation.chains.search({  });

/*
Search all of the possible locations that are a match to the specified request.
*/
await gapi.client.mybusinessbusinessinformation.googleLocations.search({  });

/*
Associates a location to a place ID. Any previous association is overwritten. This operation is only valid if the location is unverified. The association must be valid, that is, it appears in the list of `SearchGoogleLocations`.
*/
await gapi.client.mybusinessbusinessinformation.locations.associate({ name: "name",  });

/*
Clears an association between a location and its place ID. This operation is only valid if the location is unverified.
*/
await gapi.client.mybusinessbusinessinformation.locations.clearLocationAssociation({ name: "name",  });

/*
Deletes a location. If this location cannot be deleted using the API and it is marked so in the `google.mybusiness.businessinformation.v1.LocationState`, use the [Google Business Profile](https://business.google.com/manage/) website.
*/
await gapi.client.mybusinessbusinessinformation.locations.delete({ name: "name",  });

/*
Returns the specified location.
*/
await gapi.client.mybusinessbusinessinformation.locations.get({ name: "name",  });

/*
Looks up all the attributes set for a given location.
*/
await gapi.client.mybusinessbusinessinformation.locations.getAttributes({ name: "name",  });

/*
Gets the Google-updated version of the specified location.
*/
await gapi.client.mybusinessbusinessinformation.locations.getGoogleUpdated({ name: "name",  });

/*
Updates the specified location.
*/
await gapi.client.mybusinessbusinessinformation.locations.patch({ name: "name",  });

/*
Update attributes for a given location.
*/
await gapi.client.mybusinessbusinessinformation.locations.updateAttributes({ name: "name",  });
```
