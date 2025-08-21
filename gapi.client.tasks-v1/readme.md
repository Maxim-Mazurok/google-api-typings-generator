# TypeScript typings for Google Tasks API v1

The Google Tasks API lets you manage your tasks and task lists.
For detailed description please check [documentation](https://developers.google.com/workspace/tasks/).

## Installing

Install typings for Google Tasks API:

```
npm install @types/gapi.client.tasks-v1 --save-dev
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
  'https://tasks.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.tasks
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('tasks', 'v1', () => {
  // now we can use:
  // gapi.client.tasks
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // Create, edit, organize, and delete all your tasks
    'https://www.googleapis.com/auth/tasks',

    // View your tasks
    'https://www.googleapis.com/auth/tasks.readonly',
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

After that you can use Google Tasks API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Deletes the authenticated user's specified task list. If the list contains assigned tasks, both the assigned tasks and the original tasks in the assignment surface (Docs, Chat Spaces) are deleted.
*/
await gapi.client.tasks.tasklists.delete({tasklist: 'tasklist'});

/*
Returns the authenticated user's specified task list.
*/
await gapi.client.tasks.tasklists.get({tasklist: 'tasklist'});

/*
Creates a new task list and adds it to the authenticated user's task lists. A user can have up to 2000 lists at a time.
*/
await gapi.client.tasks.tasklists.insert({});

/*
Returns all the authenticated user's task lists. A user can have up to 2000 lists at a time.
*/
await gapi.client.tasks.tasklists.list({});

/*
Updates the authenticated user's specified task list. This method supports patch semantics.
*/
await gapi.client.tasks.tasklists.patch({tasklist: 'tasklist'});

/*
Updates the authenticated user's specified task list.
*/
await gapi.client.tasks.tasklists.update({tasklist: 'tasklist'});

/*
Clears all completed tasks from the specified task list. The affected tasks will be marked as 'hidden' and no longer be returned by default when retrieving all tasks for a task list.
*/
await gapi.client.tasks.tasks.clear({tasklist: 'tasklist'});

/*
Deletes the specified task from the task list. If the task is assigned, both the assigned task and the original task (in Docs, Chat Spaces) are deleted. To delete the assigned task only, navigate to the assignment surface and unassign the task from there.
*/
await gapi.client.tasks.tasks.delete({task: 'task', tasklist: 'tasklist'});

/*
Returns the specified task.
*/
await gapi.client.tasks.tasks.get({task: 'task', tasklist: 'tasklist'});

/*
Creates a new task on the specified task list. Tasks assigned from Docs or Chat Spaces cannot be inserted from Tasks Public API; they can only be created by assigning them from Docs or Chat Spaces. A user can have up to 20,000 non-hidden tasks per list and up to 100,000 tasks in total at a time.
*/
await gapi.client.tasks.tasks.insert({tasklist: 'tasklist'});

/*
Returns all tasks in the specified task list. Doesn't return assigned tasks by default (from Docs, Chat Spaces). A user can have up to 20,000 non-hidden tasks per list and up to 100,000 tasks in total at a time.
*/
await gapi.client.tasks.tasks.list({tasklist: 'tasklist'});

/*
Moves the specified task to another position in the destination task list. If the destination list is not specified, the task is moved within its current list. This can include putting it as a child task under a new parent and/or move it to a different position among its sibling tasks. A user can have up to 2,000 subtasks per task.
*/
await gapi.client.tasks.tasks.move({task: 'task', tasklist: 'tasklist'});

/*
Updates the specified task. This method supports patch semantics.
*/
await gapi.client.tasks.tasks.patch({task: 'task', tasklist: 'tasklist'});

/*
Updates the specified task.
*/
await gapi.client.tasks.tasks.update({task: 'task', tasklist: 'tasklist'});
```

For provenance information see [Provenance section on NPM](https://www.npmjs.com/package/@maxim_mazurok/gapi.client.tasks-v1#Provenance:~:text=none-,Provenance,-Built%20and%20signed)
