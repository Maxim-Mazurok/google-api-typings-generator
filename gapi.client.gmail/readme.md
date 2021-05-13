# TypeScript typings for Gmail API v1

The Gmail API lets you view and manage Gmail mailbox data like threads, messages, and labels.
For detailed description please check [documentation](https://developers.google.com/gmail/api/).

## Installing

Install typings for Gmail API:

```
npm install @types/gapi.client.gmail@v1 --save-dev
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
gapi.client.load('gmail', 'v1', () => {
  // now we can use gapi.client.gmail
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Read, compose, send, and permanently delete all your email from Gmail
      'https://mail.google.com/',

      // Manage drafts and send emails when you interact with the add-on
      'https://www.googleapis.com/auth/gmail.addons.current.action.compose',

      // View your email messages when you interact with the add-on
      'https://www.googleapis.com/auth/gmail.addons.current.message.action',

      // View your email message metadata when the add-on is running
      'https://www.googleapis.com/auth/gmail.addons.current.message.metadata',

      // View your email messages when the add-on is running
      'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',

      // Manage drafts and send emails
      'https://www.googleapis.com/auth/gmail.compose',

      // Add emails into your Gmail mailbox
      'https://www.googleapis.com/auth/gmail.insert',

      // See and edit your email labels
      'https://www.googleapis.com/auth/gmail.labels',

      // View your email message metadata such as labels and headers, but not the email body
      'https://www.googleapis.com/auth/gmail.metadata',

      // Read, compose, and send emails from your Gmail account
      'https://www.googleapis.com/auth/gmail.modify',

      // View your email messages and settings
      'https://www.googleapis.com/auth/gmail.readonly',

      // Send email on your behalf
      'https://www.googleapis.com/auth/gmail.send',

      // See, edit, create, or change your email settings and filters in Gmail
      'https://www.googleapis.com/auth/gmail.settings.basic',

      // Manage your sensitive mail settings, including who can manage your mail
      'https://www.googleapis.com/auth/gmail.settings.sharing',
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

After that you can use Gmail API resources:

```typescript

/*
Gets the current user's Gmail profile.
*/
await gapi.client.gmail.users.getProfile({ userId: "userId",  });

/*
Stop receiving push notifications for the given user mailbox.
*/
await gapi.client.gmail.users.stop({ userId: "userId",  });

/*
Set up or update a push notification watch on the given user mailbox.
*/
await gapi.client.gmail.users.watch({ userId: "userId",  });
```
