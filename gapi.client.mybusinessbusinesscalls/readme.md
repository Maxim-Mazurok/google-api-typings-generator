# TypeScript typings for My Business Business Calls API v1

The My Business Business Calls API manages business calls information of a location on Google and collect insights like the number of missed calls to their location. Additional information about Business calls can be found at https://support.google.com/business/answer/9688285?p=call_history. If the Google Business Profile links to a Google Ads account and call history is turned on, calls that last longer than a specific time, and that can be attributed to an ad interaction, will show in the linked Google Ads account under the "Calls from Ads" conversion. If smart bidding and call conversions are used in the optimization strategy, there could be a change in ad spend. Learn more about smart bidding. To view and perform actions on a location's calls, you need to be a `OWNER`, `CO_OWNER` or `MANAGER` of the location.
For detailed description please check [documentation](https://developers.google.com/my-business/).

## Installing

Install typings for My Business Business Calls API:

```
npm install @types/gapi.client.mybusinessbusinesscalls@v1 --save-dev
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
gapi.client.load('mybusinessbusinesscalls', 'v1', () => {
  // now we can use gapi.client.mybusinessbusinesscalls
  // ...
});
```



After that you can use My Business Business Calls API resources:

```typescript

/*
Returns the Business calls settings resource for the given location.
*/
await gapi.client.mybusinessbusinesscalls.locations.getBusinesscallssettings({ name: "name",  });

/*
Updates the Business call settings for the specified location.
*/
await gapi.client.mybusinessbusinesscalls.locations.updateBusinesscallssettings({ name: "name",  });
```
