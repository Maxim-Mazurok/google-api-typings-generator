# TypeScript typings for Apps Script API v1

Manages and executes Google Apps Script projects. 
For detailed description please check [documentation](https://developers.google.com/apps-script/api/).

## Installing

Install typings for Apps Script API:

```
npm install @types/gapi.client.script@v1 --save-dev
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
gapi.client.load('script', 'v1', () => {
  // now we can use gapi.client.script
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

      // See, edit, share, and permanently delete all the calendars you can access using Google Calendar
      'https://www.google.com/calendar/feeds',

      // See, edit, download, and permanently delete your contacts
      'https://www.google.com/m8/feeds',

      // View and manage the provisioning of groups on your domain
      'https://www.googleapis.com/auth/admin.directory.group',

      // View and manage the provisioning of users on your domain
      'https://www.googleapis.com/auth/admin.directory.user',

      // View and manage your Google Docs documents
      'https://www.googleapis.com/auth/documents',

      // See, edit, create, and delete all of your Google Drive files
      'https://www.googleapis.com/auth/drive',

      // View and manage your forms in Google Drive
      'https://www.googleapis.com/auth/forms',

      // View and manage forms that this application has been installed in
      'https://www.googleapis.com/auth/forms.currentonly',

      // View and manage your Google Groups
      'https://www.googleapis.com/auth/groups',

      // Create and update Google Apps Script deployments
      'https://www.googleapis.com/auth/script.deployments',

      // View Google Apps Script deployments
      'https://www.googleapis.com/auth/script.deployments.readonly',

      // View Google Apps Script project's metrics
      'https://www.googleapis.com/auth/script.metrics',

      // View Google Apps Script processes
      'https://www.googleapis.com/auth/script.processes',

      // Create and update Google Apps Script projects
      'https://www.googleapis.com/auth/script.projects',

      // View Google Apps Script projects
      'https://www.googleapis.com/auth/script.projects.readonly',

      // See, edit, create, and delete your spreadsheets in Google Drive
      'https://www.googleapis.com/auth/spreadsheets',

      // View your email address
      'https://www.googleapis.com/auth/userinfo.email',
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

After that you can use Apps Script API resources:

```typescript

/*
List information about processes made by or on behalf of a user, such as process type and current status.
*/
await gapi.client.script.processes.list({  });

/*
List information about a script's executed processes, such as process type and current status.
*/
await gapi.client.script.processes.listScriptProcesses({  });

/*
Creates a new, empty script project with no script files and a base manifest file.
*/
await gapi.client.script.projects.create({  });

/*
Gets a script project's metadata.
*/
await gapi.client.script.projects.get({ scriptId: "scriptId",  });

/*
Gets the content of the script project, including the code source and metadata for each script file.
*/
await gapi.client.script.projects.getContent({ scriptId: "scriptId",  });

/*
Get metrics data for scripts, such as number of executions and active users.
*/
await gapi.client.script.projects.getMetrics({ scriptId: "scriptId",  });

/*
Updates the content of the specified script project. This content is stored as the HEAD version, and is used when the script is executed as a trigger, in the script editor, in add-on preview mode, or as a web app or Apps Script API in development mode. This clears all the existing files in the project.
*/
await gapi.client.script.projects.updateContent({ scriptId: "scriptId",  });

/*
Runs a function in an Apps Script project. The script project must be deployed for use with the Apps Script API and the calling application must share the same Cloud Platform project. This method requires authorization with an OAuth 2.0 token that includes at least one of the scopes listed in the [Authorization](#authorization-scopes) section; script projects that do not require authorization cannot be executed through this API. To find the correct scopes to include in the authentication token, open the project in the script editor, then select **File > Project properties** and click the **Scopes** tab. The error `403, PERMISSION_DENIED: The caller does not have permission` indicates that the Cloud Platform project used to authorize the request is not the same as the one used by the script.
*/
await gapi.client.script.scripts.run({ scriptId: "scriptId",  });
```
