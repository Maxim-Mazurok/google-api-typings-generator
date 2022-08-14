# TypeScript typings for Tasks API v1

The Google Tasks API lets you manage your tasks and task lists.
For detailed description please check [documentation](https://developers.google.com/tasks/).

## Installing

Install typings for Tasks API:

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
gapi.client.load('https://tasks.googleapis.com/$discovery/rest?version=v1', () => {
  // now we can use:
  // gapi.client.tasks
});
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
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Tasks API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Deletes the authenticated user's specified task list.
*/
await gapi.client.tasks.tasklists.delete({ tasklist: "tasklist",  });

/*
Returns the authenticated user's specified task list.
*/
await gapi.client.tasks.tasklists.get({ tasklist: "tasklist",  });

/*
Creates a new task list and adds it to the authenticated user's task lists.
*/
await gapi.client.tasks.tasklists.insert({  });

/*
Returns all the authenticated user's task lists.
*/
await gapi.client.tasks.tasklists.list({  });

/*
Updates the authenticated user's specified task list. This method supports patch semantics.
*/
await gapi.client.tasks.tasklists.patch({ tasklist: "tasklist",  });

/*
Updates the authenticated user's specified task list.
*/
await gapi.client.tasks.tasklists.update({ tasklist: "tasklist",  });

/*
Clears all completed tasks from the specified task list. The affected tasks will be marked as 'hidden' and no longer be returned by default when retrieving all tasks for a task list.
*/
await gapi.client.tasks.tasks.clear({ tasklist: "tasklist",  });

/*
Deletes the specified task from the task list.
*/
await gapi.client.tasks.tasks.delete({ task: "task", tasklist: "tasklist",  });

/*
Returns the specified task.
*/
await gapi.client.tasks.tasks.get({ task: "task", tasklist: "tasklist",  });

/*
Creates a new task on the specified task list.
*/
await gapi.client.tasks.tasks.insert({ tasklist: "tasklist",  });

/*
Returns all tasks in the specified task list.
*/
await gapi.client.tasks.tasks.list({ tasklist: "tasklist",  });

/*
Moves the specified task to another position in the task list. This can include putting it as a child task under a new parent and/or move it to a different position among its sibling tasks.
*/
await gapi.client.tasks.tasks.move({ task: "task", tasklist: "tasklist",  });

/*
Updates the specified task. This method supports patch semantics.
*/
await gapi.client.tasks.tasks.patch({ task: "task", tasklist: "tasklist",  });

/*
Updates the specified task.
*/
await gapi.client.tasks.tasks.update({ task: "task", tasklist: "tasklist",  });
```
