# TypeScript typings for Cloud Pub/Sub API v1beta1a

Provides reliable, many-to-many, asynchronous messaging between applications. 
For detailed description please check [documentation](https://cloud.google.com/pubsub/docs).

## Installing

Install typings for Cloud Pub/Sub API:

```
npm install @types/gapi.client.pubsub-v1beta1a --save-dev
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
gapi.client.load('https://pubsub.googleapis.com/$discovery/rest?version=v1beta1a', () => {
  // now we can use:
  // gapi.client.pubsub
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('pubsub', 'v1beta1a', () => {
  // now we can use:
  // gapi.client.pubsub
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',

      // View and manage Pub/Sub topics and subscriptions
      'https://www.googleapis.com/auth/pubsub',
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

After that you can use Cloud Pub/Sub API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Acknowledges a particular received message: the Pub/Sub system can remove the given message from the subscription. Acknowledging a message whose Ack deadline has expired may succeed, but the message could have been already redelivered. Acknowledging a message more than once will not result in an error. This is only used for messages received via pull.
*/
await gapi.client.pubsub.subscriptions.acknowledge({  });

/*
Creates a subscription on a given topic for a given subscriber. If the subscription already exists, returns ALREADY_EXISTS. If the corresponding topic doesn't exist, returns NOT_FOUND. If the name is not provided in the request, the server will assign a random name for this subscription on the same project as the topic.
*/
await gapi.client.pubsub.subscriptions.create({  });

/*
Deletes an existing subscription. All pending messages in the subscription are immediately dropped. Calls to Pull after deletion will return NOT_FOUND.
*/
await gapi.client.pubsub.subscriptions.delete({ subscription: "subscription",  });

/*
Gets the configuration details of a subscription.
*/
await gapi.client.pubsub.subscriptions.get({ subscription: "subscription",  });

/*
Lists matching subscriptions.
*/
await gapi.client.pubsub.subscriptions.list({  });

/*
Modifies the Ack deadline for a message received from a pull request.
*/
await gapi.client.pubsub.subscriptions.modifyAckDeadline({  });

/*
Modifies the PushConfig for a specified subscription. This method can be used to suspend the flow of messages to an endpoint by clearing the PushConfig field in the request. Messages will be accumulated for delivery even if no push configuration is defined or while the configuration is modified.
*/
await gapi.client.pubsub.subscriptions.modifyPushConfig({  });

/*
Pulls a single message from the server. If return_immediately is true, and no messages are available in the subscription, this method returns FAILED_PRECONDITION. The system is free to return an UNAVAILABLE error if no messages are available in a reasonable amount of time (to reduce system load).
*/
await gapi.client.pubsub.subscriptions.pull({  });

/*
Pulls messages from the server. Returns an empty list if there are no messages available in the backlog. The system is free to return UNAVAILABLE if there are too many pull requests outstanding for the given subscription.
*/
await gapi.client.pubsub.subscriptions.pullBatch({  });

/*
Creates the given topic with the given name.
*/
await gapi.client.pubsub.topics.create({  });

/*
Deletes the topic with the given name. Returns NOT_FOUND if the topic does not exist. After a topic is deleted, a new topic may be created with the same name.
*/
await gapi.client.pubsub.topics.delete({ topic: "topic",  });

/*
Gets the configuration of a topic. Since the topic only has the name attribute, this method is only useful to check the existence of a topic. If other attributes are added in the future, they will be returned here.
*/
await gapi.client.pubsub.topics.get({ topic: "topic",  });

/*
Lists matching topics.
*/
await gapi.client.pubsub.topics.list({  });

/*
Adds a message to the topic. Returns NOT_FOUND if the topic does not exist.
*/
await gapi.client.pubsub.topics.publish({  });

/*
Adds one or more messages to the topic. Returns NOT_FOUND if the topic does not exist.
*/
await gapi.client.pubsub.topics.publishBatch({  });
```
