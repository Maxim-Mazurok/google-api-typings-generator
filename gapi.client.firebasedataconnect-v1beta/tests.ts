/* This is stub file for gapi.client.firebasedataconnect-v1beta definition tests */
// IMPORTANT
// This file was generated by https://github.com/Maxim-Mazurok/google-api-typings-generator. Please do not edit it manually.
// In case of any problems please post issue to https://github.com/Maxim-Mazurok/google-api-typings-generator

// Revision: 20240918

gapi.load('client', async () => {
  /** now we can use gapi.client */

  await gapi.client.load(
    'https://firebasedataconnect.googleapis.com/$discovery/rest?version=v1beta'
  );
  /** now we can use gapi.client.firebasedataconnect */

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
    await gapi.client.firebasedataconnect.projects.locations.get({
      name: 'Test string',
    });
    /** Lists information about the supported locations for this service. */
    await gapi.client.firebasedataconnect.projects.locations.list({
      filter: 'Test string',
      name: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
    });
    /** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
    await gapi.client.firebasedataconnect.projects.locations.operations.cancel(
      {
        name: 'Test string',
      },
      {}
    );
    /** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
    await gapi.client.firebasedataconnect.projects.locations.operations.delete({
      name: 'Test string',
    });
    /** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
    await gapi.client.firebasedataconnect.projects.locations.operations.get({
      name: 'Test string',
    });
    /** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
    await gapi.client.firebasedataconnect.projects.locations.operations.list({
      filter: 'Test string',
      name: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
    });
    /** Creates a new Service in a given project and location. */
    await gapi.client.firebasedataconnect.projects.locations.services.create(
      {
        parent: 'Test string',
        requestId: 'Test string',
        serviceId: 'Test string',
        validateOnly: true,
      },
      {
        annotations: {
          A: 'Test string',
        },
        createTime: 'Test string',
        displayName: 'Test string',
        etag: 'Test string',
        labels: {
          A: 'Test string',
        },
        name: 'Test string',
        reconciling: true,
        uid: 'Test string',
        updateTime: 'Test string',
      }
    );
    /** Deletes a single Service. */
    await gapi.client.firebasedataconnect.projects.locations.services.delete({
      allowMissing: true,
      etag: 'Test string',
      force: true,
      name: 'Test string',
      requestId: 'Test string',
      validateOnly: true,
    });
    /** Execute any GraphQL query and mutation against the Firebase Data Connect's generated GraphQL schema. Grants full read and write access to the connected data sources. Note: Use introspection query to explore the generated GraphQL schema. */
    await gapi.client.firebasedataconnect.projects.locations.services.executeGraphql(
      {
        name: 'Test string',
      },
      {
        extensions: {
          impersonate: {
            authClaims: {
              A: 42,
            },
            unauthenticated: true,
          },
        },
        operationName: 'Test string',
        query: 'Test string',
        variables: {
          A: 42,
        },
      }
    );
    /** Execute any GraphQL query against the Firebase Data Connect's generated GraphQL schema. Grants full read to the connected data sources. `ExecuteGraphqlRead` is identical to `ExecuteGraphql` except it only accepts read-only query. */
    await gapi.client.firebasedataconnect.projects.locations.services.executeGraphqlRead(
      {
        name: 'Test string',
      },
      {
        extensions: {
          impersonate: {
            authClaims: {
              A: 42,
            },
            unauthenticated: true,
          },
        },
        operationName: 'Test string',
        query: 'Test string',
        variables: {
          A: 42,
        },
      }
    );
    /** Gets details of a single Service. */
    await gapi.client.firebasedataconnect.projects.locations.services.get({
      name: 'Test string',
    });
    /** Lists Services in a given project and location. */
    await gapi.client.firebasedataconnect.projects.locations.services.list({
      filter: 'Test string',
      orderBy: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
      parent: 'Test string',
    });
    /** Updates the parameters of a single Service. */
    await gapi.client.firebasedataconnect.projects.locations.services.patch(
      {
        allowMissing: true,
        name: 'Test string',
        requestId: 'Test string',
        updateMask: 'Test string',
        validateOnly: true,
      },
      {
        annotations: {
          A: 'Test string',
        },
        createTime: 'Test string',
        displayName: 'Test string',
        etag: 'Test string',
        labels: {
          A: 'Test string',
        },
        name: 'Test string',
        reconciling: true,
        uid: 'Test string',
        updateTime: 'Test string',
      }
    );
    /** Creates a new Connector in a given project and location. The operations are validated against and must be compatible with the active schema. If the operations and schema are not compatible or if the schema is not present, this will result in an error. */
    await gapi.client.firebasedataconnect.projects.locations.services.connectors.create(
      {
        connectorId: 'Test string',
        parent: 'Test string',
        requestId: 'Test string',
        validateOnly: true,
      },
      {
        annotations: {
          A: 'Test string',
        },
        createTime: 'Test string',
        displayName: 'Test string',
        etag: 'Test string',
        labels: {
          A: 'Test string',
        },
        name: 'Test string',
        reconciling: true,
        source: {
          files: [
            {
              content: 'Test string',
              path: 'Test string',
            },
          ],
        },
        uid: 'Test string',
        updateTime: 'Test string',
      }
    );
    /** Deletes a single Connector. */
    await gapi.client.firebasedataconnect.projects.locations.services.connectors.delete(
      {
        allowMissing: true,
        etag: 'Test string',
        force: true,
        name: 'Test string',
        requestId: 'Test string',
        validateOnly: true,
      }
    );
    /** Execute a predefined mutation in a Connector. */
    await gapi.client.firebasedataconnect.projects.locations.services.connectors.executeMutation(
      {
        name: 'Test string',
      },
      {
        operationName: 'Test string',
        variables: {
          A: 42,
        },
      }
    );
    /** Execute a predefined query in a Connector. */
    await gapi.client.firebasedataconnect.projects.locations.services.connectors.executeQuery(
      {
        name: 'Test string',
      },
      {
        operationName: 'Test string',
        variables: {
          A: 42,
        },
      }
    );
    /** Gets details of a single Connector. */
    await gapi.client.firebasedataconnect.projects.locations.services.connectors.get(
      {
        name: 'Test string',
      }
    );
    /** Lists Connectors in a given project and location. */
    await gapi.client.firebasedataconnect.projects.locations.services.connectors.list(
      {
        filter: 'Test string',
        orderBy: 'Test string',
        pageSize: 42,
        pageToken: 'Test string',
        parent: 'Test string',
      }
    );
    /** Updates the parameters of a single Connector, and creates a new ConnectorRevision with the updated Connector. The operations are validated against and must be compatible with the live schema. If the operations and schema are not compatible or if the schema is not present, this will result in an error. */
    await gapi.client.firebasedataconnect.projects.locations.services.connectors.patch(
      {
        allowMissing: true,
        name: 'Test string',
        requestId: 'Test string',
        updateMask: 'Test string',
        validateOnly: true,
      },
      {
        annotations: {
          A: 'Test string',
        },
        createTime: 'Test string',
        displayName: 'Test string',
        etag: 'Test string',
        labels: {
          A: 'Test string',
        },
        name: 'Test string',
        reconciling: true,
        source: {
          files: [
            {
              content: 'Test string',
              path: 'Test string',
            },
          ],
        },
        uid: 'Test string',
        updateTime: 'Test string',
      }
    );
    /** Creates a new Schema in a given project and location. Only creation of `schemas/main` is supported and calling create with any other schema ID will result in an error. */
    await gapi.client.firebasedataconnect.projects.locations.services.schemas.create(
      {
        parent: 'Test string',
        requestId: 'Test string',
        schemaId: 'Test string',
        validateOnly: true,
      },
      {
        annotations: {
          A: 'Test string',
        },
        createTime: 'Test string',
        datasources: [
          {
            postgresql: {
              cloudSql: {
                instance: 'Test string',
              },
              database: 'Test string',
              schemaValidation: 'Test string',
            },
          },
        ],
        displayName: 'Test string',
        etag: 'Test string',
        labels: {
          A: 'Test string',
        },
        name: 'Test string',
        reconciling: true,
        source: {
          files: [
            {
              content: 'Test string',
              path: 'Test string',
            },
          ],
        },
        uid: 'Test string',
        updateTime: 'Test string',
      }
    );
    /** Deletes a single Schema. Because the schema and connectors must be compatible at all times, if this is called while any connectors are active, this will result in an error. */
    await gapi.client.firebasedataconnect.projects.locations.services.schemas.delete(
      {
        allowMissing: true,
        etag: 'Test string',
        force: true,
        name: 'Test string',
        requestId: 'Test string',
        validateOnly: true,
      }
    );
    /** Gets details of a single Schema. */
    await gapi.client.firebasedataconnect.projects.locations.services.schemas.get(
      {
        name: 'Test string',
      }
    );
    /** Lists Schemas in a given project and location. Note that only `schemas/main` is supported, so this will always return at most one Schema. */
    await gapi.client.firebasedataconnect.projects.locations.services.schemas.list(
      {
        filter: 'Test string',
        orderBy: 'Test string',
        pageSize: 42,
        pageToken: 'Test string',
        parent: 'Test string',
      }
    );
    /** Updates the parameters of a single Schema, and creates a new SchemaRevision with the updated Schema. */
    await gapi.client.firebasedataconnect.projects.locations.services.schemas.patch(
      {
        allowMissing: true,
        name: 'Test string',
        requestId: 'Test string',
        updateMask: 'Test string',
        validateOnly: true,
      },
      {
        annotations: {
          A: 'Test string',
        },
        createTime: 'Test string',
        datasources: [
          {
            postgresql: {
              cloudSql: {
                instance: 'Test string',
              },
              database: 'Test string',
              schemaValidation: 'Test string',
            },
          },
        ],
        displayName: 'Test string',
        etag: 'Test string',
        labels: {
          A: 'Test string',
        },
        name: 'Test string',
        reconciling: true,
        source: {
          files: [
            {
              content: 'Test string',
              path: 'Test string',
            },
          ],
        },
        uid: 'Test string',
        updateTime: 'Test string',
      }
    );
  }
});