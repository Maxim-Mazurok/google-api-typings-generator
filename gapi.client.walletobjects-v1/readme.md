# TypeScript typings for Google Wallet API v1

API for issuers to save and manage Google Wallet Objects.
For detailed description please check [documentation](https://developers.google.com/pay/passes).

## Installing

Install typings for Google Wallet API:

```
npm install @types/gapi.client.walletobjects-v1 --save-dev
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
  'https://walletobjects.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.walletobjects
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('walletobjects', 'v1', () => {
  // now we can use:
  // gapi.client.walletobjects
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Private Service: https://www.googleapis.com/auth/wallet_object.issuer
    'https://www.googleapis.com/auth/wallet_object.issuer',
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
  }
);
```

After that you can use Google Wallet API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Adds a message to the event ticket class referenced by the given class ID.
*/
await gapi.client.walletobjects.eventticketclass.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the event ticket class with the given class ID.
*/
await gapi.client.walletobjects.eventticketclass.get({
  resourceId: 'resourceId',
});

/*
Inserts an event ticket class with the given ID and properties.
*/
await gapi.client.walletobjects.eventticketclass.insert({});

/*
Returns a list of all event ticket classes for a given issuer ID.
*/
await gapi.client.walletobjects.eventticketclass.list({});

/*
Updates the event ticket class referenced by the given class ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.eventticketclass.patch({
  resourceId: 'resourceId',
});

/*
Updates the event ticket class referenced by the given class ID.
*/
await gapi.client.walletobjects.eventticketclass.update({
  resourceId: 'resourceId',
});

/*
Adds a message to the event ticket object referenced by the given object ID.
*/
await gapi.client.walletobjects.eventticketobject.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the event ticket object with the given object ID.
*/
await gapi.client.walletobjects.eventticketobject.get({
  resourceId: 'resourceId',
});

/*
Inserts an event ticket object with the given ID and properties.
*/
await gapi.client.walletobjects.eventticketobject.insert({});

/*
Returns a list of all event ticket objects for a given issuer ID.
*/
await gapi.client.walletobjects.eventticketobject.list({});

/*
Modifies linked offer objects for the event ticket object with the given ID.
*/
await gapi.client.walletobjects.eventticketobject.modifylinkedofferobjects({
  resourceId: 'resourceId',
});

/*
Updates the event ticket object referenced by the given object ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.eventticketobject.patch({
  resourceId: 'resourceId',
});

/*
Updates the event ticket object referenced by the given object ID.
*/
await gapi.client.walletobjects.eventticketobject.update({
  resourceId: 'resourceId',
});

/*
Adds a message to the flight class referenced by the given class ID.
*/
await gapi.client.walletobjects.flightclass.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the flight class with the given class ID.
*/
await gapi.client.walletobjects.flightclass.get({resourceId: 'resourceId'});

/*
Inserts an flight class with the given ID and properties.
*/
await gapi.client.walletobjects.flightclass.insert({});

/*
Returns a list of all flight classes for a given issuer ID.
*/
await gapi.client.walletobjects.flightclass.list({});

/*
Updates the flight class referenced by the given class ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.flightclass.patch({resourceId: 'resourceId'});

/*
Updates the flight class referenced by the given class ID.
*/
await gapi.client.walletobjects.flightclass.update({resourceId: 'resourceId'});

/*
Adds a message to the flight object referenced by the given object ID.
*/
await gapi.client.walletobjects.flightobject.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the flight object with the given object ID.
*/
await gapi.client.walletobjects.flightobject.get({resourceId: 'resourceId'});

/*
Inserts an flight object with the given ID and properties.
*/
await gapi.client.walletobjects.flightobject.insert({});

/*
Returns a list of all flight objects for a given issuer ID.
*/
await gapi.client.walletobjects.flightobject.list({});

/*
Updates the flight object referenced by the given object ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.flightobject.patch({resourceId: 'resourceId'});

/*
Updates the flight object referenced by the given object ID.
*/
await gapi.client.walletobjects.flightobject.update({resourceId: 'resourceId'});

/*
Adds a message to the generic class referenced by the given class ID.
*/
await gapi.client.walletobjects.genericclass.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the generic class with the given class ID.
*/
await gapi.client.walletobjects.genericclass.get({resourceId: 'resourceId'});

/*
Inserts a generic class with the given ID and properties.
*/
await gapi.client.walletobjects.genericclass.insert({});

/*
Returns a list of all generic classes for a given issuer ID.
*/
await gapi.client.walletobjects.genericclass.list({});

/*
Updates the generic class referenced by the given class ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.genericclass.patch({resourceId: 'resourceId'});

/*
Updates the Generic class referenced by the given class ID.
*/
await gapi.client.walletobjects.genericclass.update({resourceId: 'resourceId'});

/*
Adds a message to the generic object referenced by the given object ID.
*/
await gapi.client.walletobjects.genericobject.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the generic object with the given object ID.
*/
await gapi.client.walletobjects.genericobject.get({resourceId: 'resourceId'});

/*
Inserts a generic object with the given ID and properties.
*/
await gapi.client.walletobjects.genericobject.insert({});

/*
Returns a list of all generic objects for a given issuer ID.
*/
await gapi.client.walletobjects.genericobject.list({});

/*
Updates the generic object referenced by the given object ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.genericobject.patch({resourceId: 'resourceId'});

/*
Updates the generic object referenced by the given object ID.
*/
await gapi.client.walletobjects.genericobject.update({
  resourceId: 'resourceId',
});

/*
Adds a message to the gift card class referenced by the given class ID.
*/
await gapi.client.walletobjects.giftcardclass.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the gift card class with the given class ID.
*/
await gapi.client.walletobjects.giftcardclass.get({resourceId: 'resourceId'});

/*
Inserts an gift card class with the given ID and properties.
*/
await gapi.client.walletobjects.giftcardclass.insert({});

/*
Returns a list of all gift card classes for a given issuer ID.
*/
await gapi.client.walletobjects.giftcardclass.list({});

/*
Updates the gift card class referenced by the given class ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.giftcardclass.patch({resourceId: 'resourceId'});

/*
Updates the gift card class referenced by the given class ID.
*/
await gapi.client.walletobjects.giftcardclass.update({
  resourceId: 'resourceId',
});

/*
Adds a message to the gift card object referenced by the given object ID.
*/
await gapi.client.walletobjects.giftcardobject.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the gift card object with the given object ID.
*/
await gapi.client.walletobjects.giftcardobject.get({resourceId: 'resourceId'});

/*
Inserts an gift card object with the given ID and properties.
*/
await gapi.client.walletobjects.giftcardobject.insert({});

/*
Returns a list of all gift card objects for a given issuer ID.
*/
await gapi.client.walletobjects.giftcardobject.list({});

/*
Updates the gift card object referenced by the given object ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.giftcardobject.patch({
  resourceId: 'resourceId',
});

/*
Updates the gift card object referenced by the given object ID.
*/
await gapi.client.walletobjects.giftcardobject.update({
  resourceId: 'resourceId',
});

/*
Returns the issuer with the given issuer ID.
*/
await gapi.client.walletobjects.issuer.get({resourceId: 'resourceId'});

/*
Inserts an issuer with the given ID and properties.
*/
await gapi.client.walletobjects.issuer.insert({});

/*
Returns a list of all issuers shared to the caller.
*/
await gapi.client.walletobjects.issuer.list({});

/*
Updates the issuer referenced by the given issuer ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.issuer.patch({resourceId: 'resourceId'});

/*
Updates the issuer referenced by the given issuer ID.
*/
await gapi.client.walletobjects.issuer.update({resourceId: 'resourceId'});

/*
Inserts the resources in the JWT.
*/
await gapi.client.walletobjects.jwt.insert({});

/*
Adds a message to the loyalty class referenced by the given class ID.
*/
await gapi.client.walletobjects.loyaltyclass.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the loyalty class with the given class ID.
*/
await gapi.client.walletobjects.loyaltyclass.get({resourceId: 'resourceId'});

/*
Inserts an loyalty class with the given ID and properties.
*/
await gapi.client.walletobjects.loyaltyclass.insert({});

/*
Returns a list of all loyalty classes for a given issuer ID.
*/
await gapi.client.walletobjects.loyaltyclass.list({});

/*
Updates the loyalty class referenced by the given class ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.loyaltyclass.patch({resourceId: 'resourceId'});

/*
Updates the loyalty class referenced by the given class ID.
*/
await gapi.client.walletobjects.loyaltyclass.update({resourceId: 'resourceId'});

/*
Adds a message to the loyalty object referenced by the given object ID.
*/
await gapi.client.walletobjects.loyaltyobject.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the loyalty object with the given object ID.
*/
await gapi.client.walletobjects.loyaltyobject.get({resourceId: 'resourceId'});

/*
Inserts an loyalty object with the given ID and properties.
*/
await gapi.client.walletobjects.loyaltyobject.insert({});

/*
Returns a list of all loyalty objects for a given issuer ID.
*/
await gapi.client.walletobjects.loyaltyobject.list({});

/*
Modifies linked offer objects for the loyalty object with the given ID.
*/
await gapi.client.walletobjects.loyaltyobject.modifylinkedofferobjects({
  resourceId: 'resourceId',
});

/*
Updates the loyalty object referenced by the given object ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.loyaltyobject.patch({resourceId: 'resourceId'});

/*
Updates the loyalty object referenced by the given object ID.
*/
await gapi.client.walletobjects.loyaltyobject.update({
  resourceId: 'resourceId',
});

/*
Downloads rotating barcode values for the transit object referenced by the given object ID.
*/
await gapi.client.walletobjects.media.download({resourceId: 'resourceId'});

/*
Uploads rotating barcode values for the transit object referenced by the given object ID. Note the max upload size is specified in google3/production/config/cdd/apps-upload/customers/payments-consumer-passes/config.gcl and enforced by Scotty.
*/
await gapi.client.walletobjects.media.upload({resourceId: 'resourceId'});

/*
Adds a message to the offer class referenced by the given class ID.
*/
await gapi.client.walletobjects.offerclass.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the offer class with the given class ID.
*/
await gapi.client.walletobjects.offerclass.get({resourceId: 'resourceId'});

/*
Inserts an offer class with the given ID and properties.
*/
await gapi.client.walletobjects.offerclass.insert({});

/*
Returns a list of all offer classes for a given issuer ID.
*/
await gapi.client.walletobjects.offerclass.list({});

/*
Updates the offer class referenced by the given class ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.offerclass.patch({resourceId: 'resourceId'});

/*
Updates the offer class referenced by the given class ID.
*/
await gapi.client.walletobjects.offerclass.update({resourceId: 'resourceId'});

/*
Adds a message to the offer object referenced by the given object ID.
*/
await gapi.client.walletobjects.offerobject.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the offer object with the given object ID.
*/
await gapi.client.walletobjects.offerobject.get({resourceId: 'resourceId'});

/*
Inserts an offer object with the given ID and properties.
*/
await gapi.client.walletobjects.offerobject.insert({});

/*
Returns a list of all offer objects for a given issuer ID.
*/
await gapi.client.walletobjects.offerobject.list({});

/*
Updates the offer object referenced by the given object ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.offerobject.patch({resourceId: 'resourceId'});

/*
Updates the offer object referenced by the given object ID.
*/
await gapi.client.walletobjects.offerobject.update({resourceId: 'resourceId'});

/*
Returns the permissions for the given issuer id.
*/
await gapi.client.walletobjects.permissions.get({resourceId: 'resourceId'});

/*
Updates the permissions for the given issuer.
*/
await gapi.client.walletobjects.permissions.update({resourceId: 'resourceId'});

/*
Inserts the smart tap.
*/
await gapi.client.walletobjects.smarttap.insert({});

/*
Adds a message to the transit class referenced by the given class ID.
*/
await gapi.client.walletobjects.transitclass.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the transit class with the given class ID.
*/
await gapi.client.walletobjects.transitclass.get({resourceId: 'resourceId'});

/*
Inserts a transit class with the given ID and properties.
*/
await gapi.client.walletobjects.transitclass.insert({});

/*
Returns a list of all transit classes for a given issuer ID.
*/
await gapi.client.walletobjects.transitclass.list({});

/*
Updates the transit class referenced by the given class ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.transitclass.patch({resourceId: 'resourceId'});

/*
Updates the transit class referenced by the given class ID.
*/
await gapi.client.walletobjects.transitclass.update({resourceId: 'resourceId'});

/*
Adds a message to the transit object referenced by the given object ID.
*/
await gapi.client.walletobjects.transitobject.addmessage({
  resourceId: 'resourceId',
});

/*
Returns the transit object with the given object ID.
*/
await gapi.client.walletobjects.transitobject.get({resourceId: 'resourceId'});

/*
Inserts an transit object with the given ID and properties.
*/
await gapi.client.walletobjects.transitobject.insert({});

/*
Returns a list of all transit objects for a given issuer ID.
*/
await gapi.client.walletobjects.transitobject.list({});

/*
Updates the transit object referenced by the given object ID. This method supports patch semantics.
*/
await gapi.client.walletobjects.transitobject.patch({resourceId: 'resourceId'});

/*
Updates the transit object referenced by the given object ID.
*/
await gapi.client.walletobjects.transitobject.update({
  resourceId: 'resourceId',
});
```
