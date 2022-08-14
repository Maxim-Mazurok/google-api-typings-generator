# TypeScript typings for My Business Notifications API v1

The My Business Notification Settings API enables managing notification settings for business accounts.
For detailed description please check [documentation](https://developers.google.com/my-business/).

## Installing

Install typings for My Business Notifications API:

```
npm install @types/gapi.client.mybusinessnotifications-v1 --save-dev
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
gapi.client.load('https://mybusinessnotifications.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.mybusinessnotifications
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('mybusinessnotifications', 'v1', () => {
  // now we can use:
  // gapi.client.mybusinessnotifications
});
```



After that you can use My Business Notifications API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Returns the pubsub notification settings for the account.
*/
await gapi.client.mybusinessnotifications.accounts.getNotificationSetting({ name: "name",  });

/*
Sets the pubsub notification setting for the account informing Google which topic to send pubsub notifications for. Use the notification_types field within notification_setting to manipulate the events an account wants to subscribe to. An account will only have one notification setting resource, and only one pubsub topic can be set. To delete the setting, update with an empty notification_types
*/
await gapi.client.mybusinessnotifications.accounts.updateNotificationSetting({ name: "name",  });
```
