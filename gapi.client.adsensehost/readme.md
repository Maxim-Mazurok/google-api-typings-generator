# TypeScript typings for AdSense Host API v4.1

Generates performance reports, generates ad codes, and provides publisher management capabilities for AdSense Hosts.
For detailed description please check [documentation](https://developers.google.com/adsense/host/).

## Installing

Install typings for AdSense Host API:

```
npm install @types/gapi.client.adsensehost@v4.1 --save-dev
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
gapi.client.load('adsensehost', 'v4.1', () => {
  // now we can use gapi.client.adsensehost
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your AdSense host data and associated accounts
      'https://www.googleapis.com/auth/adsensehost',
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

After that you can use AdSense Host API resources:

```typescript

/*
Get information about the selected associated AdSense account.
*/
await gapi.client.adsensehost.accounts.get({ accountId: "accountId",  });

/*
List hosted accounts associated with this AdSense account by ad client id.
*/
await gapi.client.adsensehost.accounts.list({ filterAdClientId: "filterAdClientId",  });

/*
Get information about one of the ad clients in the Host AdSense account.
*/
await gapi.client.adsensehost.adclients.get({ adClientId: "adClientId",  });

/*
List all host ad clients in this AdSense account.
*/
await gapi.client.adsensehost.adclients.list({  });

/*
Create an association session for initiating an association with an AdSense user.
*/
await gapi.client.adsensehost.associationsessions.start({ productCode: "productCode", websiteUrl: "websiteUrl",  });

/*
Verify an association session after the association callback returns from AdSense signup.
*/
await gapi.client.adsensehost.associationsessions.verify({ token: "token",  });

/*
Delete a specific custom channel from the host AdSense account.
*/
await gapi.client.adsensehost.customchannels.delete({ adClientId: "adClientId", customChannelId: "customChannelId",  });

/*
Get a specific custom channel from the host AdSense account.
*/
await gapi.client.adsensehost.customchannels.get({ adClientId: "adClientId", customChannelId: "customChannelId",  });

/*
Add a new custom channel to the host AdSense account.
*/
await gapi.client.adsensehost.customchannels.insert({ adClientId: "adClientId",  });

/*
List all host custom channels in this AdSense account.
*/
await gapi.client.adsensehost.customchannels.list({ adClientId: "adClientId",  });

/*
Update a custom channel in the host AdSense account. This method supports patch semantics.
*/
await gapi.client.adsensehost.customchannels.patch({ adClientId: "adClientId", customChannelId: "customChannelId",  });

/*
Update a custom channel in the host AdSense account.
*/
await gapi.client.adsensehost.customchannels.update({ adClientId: "adClientId",  });

/*
Generate an AdSense report based on the report request sent in the query parameters. Returns the result as JSON; to retrieve output in CSV format specify "alt=csv" as a query parameter.
*/
await gapi.client.adsensehost.reports.generate({ endDate: "endDate", startDate: "startDate",  });

/*
Delete a URL channel from the host AdSense account.
*/
await gapi.client.adsensehost.urlchannels.delete({ adClientId: "adClientId", urlChannelId: "urlChannelId",  });

/*
Add a new URL channel to the host AdSense account.
*/
await gapi.client.adsensehost.urlchannels.insert({ adClientId: "adClientId",  });

/*
List all host URL channels in the host AdSense account.
*/
await gapi.client.adsensehost.urlchannels.list({ adClientId: "adClientId",  });
```
