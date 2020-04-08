# TypeScript typings for HomeGraph API v1


For detailed description please check [documentation](https://developers.google.com/actions/smarthome/create-app#request-sync).

## Installing

Install typings for HomeGraph API:

```
npm install @types/gapi.client.homegraph@v1 --save-dev
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
gapi.client.load('homegraph', 'v1', () => {
  // now we can use gapi.client.homegraph
  // ...
});
```



After that you can use HomeGraph API resources:

```typescript

/*
Unlinks the given third-party user from your smart home Action.
All data related to this user will be deleted.

For more details on how users link their accounts, see
[fulfillment and
authentication](https://developers.google.com/assistant/smarthome/concepts/fulfillment-authentication).

The third-party user's identity is passed in via the `agent_user_id`
(see DeleteAgentUserRequest).
This request must be authorized using service account credentials from your
Actions console project.
*/
await gapi.client.agentUsers.delete({ agentUserId: "agentUserId",  });

/*
Gets the current states in Home Graph for the given set of the third-party
user's devices.

The third-party user's identity is passed in via the `agent_user_id`
(see QueryRequest).
This request must be authorized using service account credentials from your
Actions console project.
*/
await gapi.client.devices.query({  });

/*
Reports device state and optionally sends device notifications.
Called by your smart home Action when the state of a third-party device
changes or you need to send a notification about the device.
See [Implement Report
State](https://developers.google.com/assistant/smarthome/develop/report-state)
for more information.

This method updates the device state according to its declared
[traits](https://developers.google.com/assistant/smarthome/concepts/devices-traits).
Publishing a new state value outside of these traits will result in an
`INVALID_ARGUMENT` error response.

The third-party user's identity is passed in via the `agent_user_id`
(see ReportStateAndNotificationRequest).
This request must be authorized using service account credentials from your
Actions console project.
*/
await gapi.client.devices.reportStateAndNotification({  });

/*
Requests Google to send an `action.devices.SYNC`
[intent](https://developers.google.com/assistant/smarthome/reference/intent/sync)
to your smart home Action to update device metadata for the given user.


The third-party user's identity is passed via the `agent_user_id`
(see RequestSyncDevicesRequest).
This request must be authorized using service account credentials from your
Actions console project.
*/
await gapi.client.devices.requestSync({  });

/*
Gets all the devices associated with the given third-party user.

The third-party user's identity is passed in via the `agent_user_id`
(see SyncRequest).
This request must be authorized using service account credentials from your
Actions console project.
*/
await gapi.client.devices.sync({  });
```
