/* This is stub file for gapi.client.gkehub-v2beta definition tests */
// IMPORTANT
// This file was generated by https://github.com/Maxim-Mazurok/google-api-typings-generator. Please do not edit it manually.
// In case of any problems please post issue to https://github.com/Maxim-Mazurok/google-api-typings-generator

// Revision: 20240809

gapi.load('client', async () => {
  /** now we can use gapi.client */

  await gapi.client.load(
    'https://gkehub.googleapis.com/$discovery/rest?version=v2beta'
  );
  /** now we can use gapi.client.gkehub */

  /** don't forget to authenticate your client before sending any request to resources: */
  /** declare client_id registered in Google Developers Console */
  const client_id = '<<PUT YOUR CLIENT ID HERE>>';
  const scope = [
    /** See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account. */
    'https://www.googleapis.com/auth/cloud-platform',
  ];
  const immediate = false;
  gapi.auth.authorize({client_id, scope, immediate}, authResult => {
    if (authResult && !authResult.error) {
      /** handle successful authorization */
      void run();
    } else {
      /** handle authorization error */
    }
  });

  async function run() {
    /** Gets information about a location. */
    await gapi.client.gkehub.projects.locations.get({
      name: 'Test string',
    });
    /** Lists information about the supported locations for this service. */
    await gapi.client.gkehub.projects.locations.list({
      filter: 'Test string',
      name: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
    });
    /** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
    await gapi.client.gkehub.projects.locations.operations.cancel(
      {
        name: 'Test string',
      },
      {}
    );
    /** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
    await gapi.client.gkehub.projects.locations.operations.get({
      name: 'Test string',
    });
    /** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
    await gapi.client.gkehub.projects.locations.operations.list({
      filter: 'Test string',
      name: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
    });
  }
});