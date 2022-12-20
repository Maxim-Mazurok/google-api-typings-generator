# TypeScript typings for HomeGraph API v1


For detailed description please check [documentation](https://developers.google.com/actions/smarthome/create-app#request-sync).

## Installing

Install typings for HomeGraph API:

```
npm install @types/gapi.client.homegraph-v1 --save-dev
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
gapi.client.load('https://homegraph.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.homegraph
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('homegraph', 'v1', () => {
  // now we can use:
  // gapi.client.homegraph
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // Private Service: https://www.googleapis.com/auth/homegraph
      'https://www.googleapis.com/auth/homegraph',
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

After that you can use HomeGraph API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Unlinks the given third-party user from your smart home Action. All data related to this user will be deleted. For more details on how users link their accounts, see [fulfillment and authentication](https://developers.google.com/assistant/smarthome/concepts/fulfillment-authentication). The third-party user's identity is passed in via the `agent_user_id` (see DeleteAgentUserRequest). This request must be authorized using service account credentials from your Actions console project.
*/
await gapi.client.homegraph.agentUsers.delete({ agentUserId: "agentUserId",  });

/*
Gets the current states in Home Graph for the given set of the third-party user's devices. The third-party user's identity is passed in via the `agent_user_id` (see QueryRequest). This request must be authorized using service account credentials from your Actions console project.
*/
await gapi.client.homegraph.devices.query({  });

/*
Reports device state and optionally sends device notifications. Called by your smart home Action when the state of a third-party device changes or you need to send a notification about the device. See [Implement Report State](https://developers.google.com/assistant/smarthome/develop/report-state) for more information. This method updates the device state according to its declared [traits](https://developers.google.com/assistant/smarthome/concepts/devices-traits). Publishing a new state value outside of these traits will result in an `INVALID_ARGUMENT` error response. The third-party user's identity is passed in via the `agent_user_id` (see ReportStateAndNotificationRequest). This request must be authorized using service account credentials from your Actions console project.
*/
await gapi.client.homegraph.devices.reportStateAndNotification({  });

/*
Requests Google to send an `action.devices.SYNC` [intent](https://developers.google.com/assistant/smarthome/reference/intent/sync) to your smart home Action to update device metadata for the given user. The third-party user's identity is passed via the `agent_user_id` (see RequestSyncDevicesRequest). This request must be authorized using service account credentials from your Actions console project.
*/
await gapi.client.homegraph.devices.requestSync({  });

/*
Gets all the devices associated with the given third-party user. The third-party user's identity is passed in via the `agent_user_id` (see SyncRequest). This request must be authorized using service account credentials from your Actions console project.
*/
await gapi.client.homegraph.devices.sync({  });
```
