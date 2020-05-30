# TypeScript typings for Licensing API v1

Licensing API to view and manage licenses for your domain
For detailed description please check [documentation](https://developers.google.com/admin-sdk/licensing/).

## Installing

Install typings for Licensing API:

```
npm install @types/gapi.client.licensing@v1 --save-dev
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
gapi.client.load('licensing', 'v1', () => {
  // now we can use gapi.client.licensing
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage G Suite licenses for your domain
      'https://www.googleapis.com/auth/apps.licensing',
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

After that you can use Licensing API resources:

```typescript

/*
Revoke a license.
*/
await gapi.client.licensing.licenseAssignments.delete({ productId: "productId", skuId: "skuId", userId: "userId",  });

/*
Get a specific user's license by product SKU.
*/
await gapi.client.licensing.licenseAssignments.get({ productId: "productId", skuId: "skuId", userId: "userId",  });

/*
Assign a license.
*/
await gapi.client.licensing.licenseAssignments.insert({ productId: "productId", skuId: "skuId",  });

/*
List all users assigned licenses for a specific product SKU.
*/
await gapi.client.licensing.licenseAssignments.listForProduct({ customerId: "customerId", productId: "productId",  });

/*
List all users assigned licenses for a specific product SKU.
*/
await gapi.client.licensing.licenseAssignments.listForProductAndSku({ customerId: "customerId", productId: "productId", skuId: "skuId",  });

/*
Reassign a user's product SKU with a different SKU in the same product. This method supports patch semantics.
*/
await gapi.client.licensing.licenseAssignments.patch({ productId: "productId", skuId: "skuId", userId: "userId",  });

/*
Reassign a user's product SKU with a different SKU in the same product.
*/
await gapi.client.licensing.licenseAssignments.update({ productId: "productId", skuId: "skuId", userId: "userId",  });
```
