# TypeScript typings for Google Chat API v1

The Google Chat API lets you build Chat apps to integrate your services with Google Chat and manage Chat resources such as spaces, members, and messages.
For detailed description please check [documentation](https://developers.google.com/hangouts/chat).

## Installing

Install typings for Google Chat API:

```
npm install @types/gapi.client.chat-v1 --save-dev
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
  'https://chat.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.chat
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('chat', 'v1', () => {
  // now we can use:
  // gapi.client.chat
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Delete conversations and spaces owned by your organization and remove access to associated files in Google Chat
    'https://www.googleapis.com/auth/chat.admin.delete',

    // View, add, update and remove members and managers in conversations owned by your organization
    'https://www.googleapis.com/auth/chat.admin.memberships',

    // View members and managers in conversations owned by your organization
    'https://www.googleapis.com/auth/chat.admin.memberships.readonly',

    // View or edit display name, description, and other metadata for all Google Chat conversations owned by your organization
    'https://www.googleapis.com/auth/chat.admin.spaces',

    // View display name, description, and other metadata for all Google Chat conversations owned by your organization
    'https://www.googleapis.com/auth/chat.admin.spaces.readonly',

    // On their own behalf, apps in Google Chat can delete conversations and spaces and remove access to associated files
    'https://www.googleapis.com/auth/chat.app.delete',

    // On their own behalf, apps in Google Chat can see, add, update, and remove members from conversations and spaces
    'https://www.googleapis.com/auth/chat.app.memberships',

    // On their own behalf, apps in Google Chat can create conversations and spaces and see or update their metadata (including history settings and access settings)
    'https://www.googleapis.com/auth/chat.app.spaces',

    // On their own behalf, apps in Google Chat can create conversations and spaces
    'https://www.googleapis.com/auth/chat.app.spaces.create',

    // Private Service: https://www.googleapis.com/auth/chat.bot
    'https://www.googleapis.com/auth/chat.bot',

    // Delete conversations and spaces and remove access to associated files in Google Chat
    'https://www.googleapis.com/auth/chat.delete',

    // Import spaces, messages, and memberships into Google Chat.
    'https://www.googleapis.com/auth/chat.import',

    // See, add, update, and remove members from conversations and spaces in Google Chat
    'https://www.googleapis.com/auth/chat.memberships',

    // Add and remove itself from conversations and spaces in Google Chat
    'https://www.googleapis.com/auth/chat.memberships.app',

    // View members in Google Chat conversations.
    'https://www.googleapis.com/auth/chat.memberships.readonly',

    // See, compose, send, update, and delete messages as well as their message content; add, see, and delete reactions to messages.
    'https://www.googleapis.com/auth/chat.messages',

    // Compose and send messages in Google Chat
    'https://www.googleapis.com/auth/chat.messages.create',

    // See, add, and delete reactions as well as their reaction content to messages in Google Chat
    'https://www.googleapis.com/auth/chat.messages.reactions',

    // Add reactions to messages in Google Chat
    'https://www.googleapis.com/auth/chat.messages.reactions.create',

    // View reactions as well as their reaction content to messages in Google Chat
    'https://www.googleapis.com/auth/chat.messages.reactions.readonly',

    // See messages as well as their reactions and message content in Google Chat
    'https://www.googleapis.com/auth/chat.messages.readonly',

    // Create conversations and spaces and see or update metadata (including history settings and access settings) in Google Chat
    'https://www.googleapis.com/auth/chat.spaces',

    // Create new conversations and spaces in Google Chat
    'https://www.googleapis.com/auth/chat.spaces.create',

    // View chat and spaces in Google Chat
    'https://www.googleapis.com/auth/chat.spaces.readonly',

    // View and modify last read time for Google Chat conversations
    'https://www.googleapis.com/auth/chat.users.readstate',

    // View last read time for Google Chat conversations
    'https://www.googleapis.com/auth/chat.users.readstate.readonly',

    // Read and update your space settings
    'https://www.googleapis.com/auth/chat.users.spacesettings',
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
  },
);
```

After that you can use Google Chat API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Downloads media. Download is supported on the URI `/v1/media/{+name}?alt=media`.
*/
await gapi.client.chat.media.download({resourceName: 'resourceName'});

/*
Uploads an attachment. For an example, see [Upload media as a file attachment](https://developers.google.com/workspace/chat/upload-media-attachments). Requires user [authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user). You can upload attachments up to 200 MB. Certain file types aren't supported. For details, see [File types blocked by Google Chat](https://support.google.com/chat/answer/7651457?&co=GENIE.Platform%3DDesktop#File%20types%20blocked%20in%20Google%20Chat).
*/
await gapi.client.chat.media.upload({parent: 'parent'});

/*
Completes the [import process](https://developers.google.com/workspace/chat/import-data) for the specified space and makes it visible to users. Requires [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) and domain-wide delegation. For more information, see [Authorize Google Chat apps to import data](https://developers.google.com/workspace/chat/authorize-import).
*/
await gapi.client.chat.spaces.completeImport({name: 'name'});

/*
Creates a space. Can be used to create a named space, or a group chat in `Import mode`. For an example, see [Create a space](https://developers.google.com/workspace/chat/create-spaces). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) in [Developer Preview](https://developers.google.com/workspace/preview) - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) When authenticating as an app, the `space.customer` field must be set in the request. Space membership upon creation depends on whether the space is created in `Import mode`: * **Import mode:** No members are created. * **All other modes:** The calling user is added as a member. This is: * The app itself when using app authentication. * The human user when using user authentication. If you receive the error message `ALREADY_EXISTS` when creating a space, try a different `displayName`. An existing space within the Google Workspace organization might already use this display name.
*/
await gapi.client.chat.spaces.create({});

/*
Deletes a named space. Always performs a cascading delete, which means that the space's child resources—like messages posted in the space and memberships in the space—are also deleted. For an example, see [Delete a space](https://developers.google.com/workspace/chat/delete-spaces). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) in [Developer Preview](https://developers.google.com/workspace/preview) - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) You can authenticate and authorize this method with administrator privileges by setting the `use_admin_access` field in the request.
*/
await gapi.client.chat.spaces.delete({name: 'name'});

/*
Returns the existing direct message with the specified user. If no direct message space is found, returns a `404 NOT_FOUND` error. For an example, see [Find a direct message](/chat/api/guides/v1/spaces/find-direct-message). With [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app), returns the direct message space between the specified user and the calling Chat app. With [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), returns the direct message space between the specified user and the authenticated user. // Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user)
*/
await gapi.client.chat.spaces.findDirectMessage({});

/*
Returns details about a space. For an example, see [Get details about a space](https://developers.google.com/workspace/chat/get-spaces). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) You can authenticate and authorize this method with administrator privileges by setting the `use_admin_access` field in the request.
*/
await gapi.client.chat.spaces.get({name: 'name'});

/*
Lists spaces the caller is a member of. Group chats and DMs aren't listed until the first message is sent. For an example, see [List spaces](https://developers.google.com/workspace/chat/list-spaces). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) To list all named spaces by Google Workspace organization, use the [`spaces.search()`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/search) method using Workspace administrator privileges instead.
*/
await gapi.client.chat.spaces.list({});

/*
Updates a space. For an example, see [Update a space](https://developers.google.com/workspace/chat/update-spaces). If you're updating the `displayName` field and receive the error message `ALREADY_EXISTS`, try a different display name.. An existing space within the Google Workspace organization might already use this display name. Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) in [Developer Preview](https://developers.google.com/workspace/preview) - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) You can authenticate and authorize this method with administrator privileges by setting the `use_admin_access` field in the request.
*/
await gapi.client.chat.spaces.patch({name: 'name'});

/*
Returns a list of spaces in a Google Workspace organization based on an administrator's search. Requires [user authentication with administrator privileges](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user#admin-privileges). In the request, set `use_admin_access` to `true`.
*/
await gapi.client.chat.spaces.search({});

/*
Creates a space and adds specified users to it. The calling user is automatically added to the space, and shouldn't be specified as a membership in the request. For an example, see [Set up a space with initial members](https://developers.google.com/workspace/chat/set-up-spaces). To specify the human members to add, add memberships with the appropriate `membership.member.name`. To add a human user, use `users/{user}`, where `{user}` can be the email address for the user. For users in the same Workspace organization `{user}` can also be the `id` for the person from the People API, or the `id` for the user in the Directory API. For example, if the People API Person profile ID for `user@example.com` is `123456789`, you can add the user to the space by setting the `membership.member.name` to `users/user@example.com` or `users/123456789`. To specify the Google groups to add, add memberships with the appropriate `membership.group_member.name`. To add or invite a Google group, use `groups/{group}`, where `{group}` is the `id` for the group from the Cloud Identity Groups API. For example, you can use [Cloud Identity Groups lookup API](https://cloud.google.com/identity/docs/reference/rest/v1/groups/lookup) to retrieve the ID `123456789` for group email `group@example.com`, then you can add the group to the space by setting the `membership.group_member.name` to `groups/123456789`. Group email is not supported, and Google groups can only be added as members in named spaces. For a named space or group chat, if the caller blocks, or is blocked by some members, or doesn't have permission to add some members, then those members aren't added to the created space. To create a direct message (DM) between the calling user and another human user, specify exactly one membership to represent the human user. If one user blocks the other, the request fails and the DM isn't created. To create a DM between the calling user and the calling app, set `Space.singleUserBotDm` to `true` and don't specify any memberships. You can only use this method to set up a DM with the calling app. To add the calling app as a member of a space or an existing DM between two human users, see [Invite or add a user or app to a space](https://developers.google.com/workspace/chat/create-members). If a DM already exists between two users, even when one user blocks the other at the time a request is made, then the existing DM is returned. Spaces with threaded replies aren't supported. If you receive the error message `ALREADY_EXISTS` when setting up a space, try a different `displayName`. An existing space within the Google Workspace organization might already use this display name. Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user).
*/
await gapi.client.chat.spaces.setup({});
```
