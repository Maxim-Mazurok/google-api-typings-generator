/* This is stub file for gapi.client.metastore-v2beta definition tests */
// IMPORTANT
// This file was generated by https://github.com/Maxim-Mazurok/google-api-typings-generator. Please do not edit it manually.
// In case of any problems please post issue to https://github.com/Maxim-Mazurok/google-api-typings-generator

// Revision: 20241203

gapi.load('client', async () => {
  /** now we can use gapi.client */

  await gapi.client.load(
    'https://metastore.googleapis.com/$discovery/rest?version=v2beta'
  );
  /** now we can use gapi.client.metastore */

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
    /** Alter metadata resource location. The metadata resource can be a database, table, or partition. This functionality only updates the parent directory for the respective metadata resource and does not transfer any existing data to the new location. */
    await gapi.client.metastore.projects.locations.services.alterLocation(
      {
        service: 'Test string',
      },
      {
        locationUri: 'Test string',
        resourceName: 'Test string',
      }
    );
    /** Alter metadata table properties. */
    await gapi.client.metastore.projects.locations.services.alterTableProperties(
      {
        service: 'Test string',
      },
      {
        properties: {
          A: 'Test string',
        },
        tableName: 'Test string',
        updateMask: 'Test string',
      }
    );
    /** Cancels the ongoing Managed Migration process. */
    await gapi.client.metastore.projects.locations.services.cancelMigration(
      {
        service: 'Test string',
      },
      {}
    );
    /** Completes the managed migration process. The Dataproc Metastore service will switch to using its own backend database after successful migration. */
    await gapi.client.metastore.projects.locations.services.completeMigration(
      {
        service: 'Test string',
      },
      {}
    );
    /** Creates a metastore service in a project and location. */
    await gapi.client.metastore.projects.locations.services.create(
      {
        parent: 'Test string',
        requestId: 'Test string',
        serviceId: 'Test string',
      },
      {
        createTime: 'Test string',
        encryptionConfig: {},
        endpoints: [
          {
            endpointUri: 'Test string',
            region: 'Test string',
          },
        ],
        hiveMetastoreConfig: {
          auxiliaryVersions: {
            A: {
              configOverrides: {
                A: 'Test string',
              },
              endpoints: [
                {
                  endpointUri: 'Test string',
                  region: 'Test string',
                },
              ],
              version: 'Test string',
            },
          },
          configOverrides: {
            A: 'Test string',
          },
          endpointProtocol: 'Test string',
          version: 'Test string',
        },
        labels: {
          A: 'Test string',
        },
        metadataIntegration: {
          dataCatalogConfig: {
            enabled: true,
          },
        },
        name: 'Test string',
        scalingConfig: {
          autoscalingConfig: {
            autoscalingEnabled: true,
            autoscalingFactor: 42,
            limitConfig: {
              maxScalingFactor: 42,
              minScalingFactor: 42,
            },
          },
          scalingFactor: 42,
        },
        scheduledBackup: {
          backupLocation: 'Test string',
          cronSchedule: 'Test string',
          enabled: true,
          latestBackup: {
            backupId: 'Test string',
            duration: 'Test string',
            startTime: 'Test string',
            state: 'Test string',
          },
          nextScheduledTime: 'Test string',
          timeZone: 'Test string',
        },
        state: 'Test string',
        stateMessage: 'Test string',
        uid: 'Test string',
        updateTime: 'Test string',
        warehouseGcsUri: 'Test string',
      }
    );
    /** Deletes a single service. */
    await gapi.client.metastore.projects.locations.services.delete({
      name: 'Test string',
      requestId: 'Test string',
    });
    /** Exports metadata from a service. */
    await gapi.client.metastore.projects.locations.services.exportMetadata(
      {
        service: 'Test string',
      },
      {
        databaseDumpType: 'Test string',
        destinationGcsFolder: 'Test string',
        requestId: 'Test string',
      }
    );
    /** Gets the details of a single service. */
    await gapi.client.metastore.projects.locations.services.get({
      name: 'Test string',
    });
    /** Imports Metadata into a Dataproc Metastore service. */
    await gapi.client.metastore.projects.locations.services.importMetadata(
      {
        name: 'Test string',
      },
      {
        databaseDump: {
          gcsUri: 'Test string',
          type: 'Test string',
        },
        description: 'Test string',
        requestId: 'Test string',
      }
    );
    /** Lists services in a project and location. */
    await gapi.client.metastore.projects.locations.services.list({
      filter: 'Test string',
      orderBy: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
      parent: 'Test string',
    });
    /** Move a table to another database. */
    await gapi.client.metastore.projects.locations.services.moveTableToDatabase(
      {
        service: 'Test string',
      },
      {
        dbName: 'Test string',
        destinationDbName: 'Test string',
        tableName: 'Test string',
      }
    );
    /** Updates the parameters of a single service. */
    await gapi.client.metastore.projects.locations.services.patch(
      {
        name: 'Test string',
        requestId: 'Test string',
        updateMask: 'Test string',
      },
      {
        createTime: 'Test string',
        encryptionConfig: {},
        endpoints: [
          {
            endpointUri: 'Test string',
            region: 'Test string',
          },
        ],
        hiveMetastoreConfig: {
          auxiliaryVersions: {
            A: {
              configOverrides: {
                A: 'Test string',
              },
              endpoints: [
                {
                  endpointUri: 'Test string',
                  region: 'Test string',
                },
              ],
              version: 'Test string',
            },
          },
          configOverrides: {
            A: 'Test string',
          },
          endpointProtocol: 'Test string',
          version: 'Test string',
        },
        labels: {
          A: 'Test string',
        },
        metadataIntegration: {
          dataCatalogConfig: {
            enabled: true,
          },
        },
        name: 'Test string',
        scalingConfig: {
          autoscalingConfig: {
            autoscalingEnabled: true,
            autoscalingFactor: 42,
            limitConfig: {
              maxScalingFactor: 42,
              minScalingFactor: 42,
            },
          },
          scalingFactor: 42,
        },
        scheduledBackup: {
          backupLocation: 'Test string',
          cronSchedule: 'Test string',
          enabled: true,
          latestBackup: {
            backupId: 'Test string',
            duration: 'Test string',
            startTime: 'Test string',
            state: 'Test string',
          },
          nextScheduledTime: 'Test string',
          timeZone: 'Test string',
        },
        state: 'Test string',
        stateMessage: 'Test string',
        uid: 'Test string',
        updateTime: 'Test string',
        warehouseGcsUri: 'Test string',
      }
    );
    /** Query Dataproc Metastore metadata. */
    await gapi.client.metastore.projects.locations.services.queryMetadata(
      {
        service: 'Test string',
      },
      {
        query: 'Test string',
      }
    );
    /** Removes the attached IAM policies for a resource */
    await gapi.client.metastore.projects.locations.services.removeIamPolicy(
      {
        resource: 'Test string',
      },
      {
        asynchronous: true,
      }
    );
    /** Restores a service from a backup. */
    await gapi.client.metastore.projects.locations.services.restore(
      {
        service: 'Test string',
      },
      {
        backup: 'Test string',
        backupLocation: 'Test string',
        requestId: 'Test string',
        restoreType: 'Test string',
      }
    );
    /** Starts the Managed Migration process. */
    await gapi.client.metastore.projects.locations.services.startMigration(
      {
        service: 'Test string',
      },
      {
        migrationExecution: {
          cloudSqlMigrationConfig: {
            cdcConfig: {
              bucket: 'Test string',
              password: 'Test string',
              reverseProxySubnet: 'Test string',
              rootPath: 'Test string',
              subnetIpRange: 'Test string',
              username: 'Test string',
              vpcNetwork: 'Test string',
            },
            cloudSqlConnectionConfig: {
              hiveDatabaseName: 'Test string',
              instanceConnectionName: 'Test string',
              ipAddress: 'Test string',
              natSubnet: 'Test string',
              password: 'Test string',
              port: 42,
              proxySubnet: 'Test string',
              username: 'Test string',
            },
          },
          createTime: 'Test string',
          endTime: 'Test string',
          name: 'Test string',
          phase: 'Test string',
          state: 'Test string',
          stateMessage: 'Test string',
        },
        requestId: 'Test string',
      }
    );
    /** Creates a new backup in a given project and location. */
    await gapi.client.metastore.projects.locations.services.backups.create(
      {
        backupId: 'Test string',
        parent: 'Test string',
        requestId: 'Test string',
      },
      {
        createTime: 'Test string',
        description: 'Test string',
        endTime: 'Test string',
        name: 'Test string',
        restoringServices: ['Test string'],
        serviceRevision: {
          createTime: 'Test string',
          encryptionConfig: {},
          endpoints: [
            {
              endpointUri: 'Test string',
              region: 'Test string',
            },
          ],
          hiveMetastoreConfig: {
            auxiliaryVersions: {
              A: {
                configOverrides: {
                  A: 'Test string',
                },
                endpoints: [
                  {
                    endpointUri: 'Test string',
                    region: 'Test string',
                  },
                ],
                version: 'Test string',
              },
            },
            configOverrides: {
              A: 'Test string',
            },
            endpointProtocol: 'Test string',
            version: 'Test string',
          },
          labels: {
            A: 'Test string',
          },
          metadataIntegration: {
            dataCatalogConfig: {
              enabled: true,
            },
          },
          name: 'Test string',
          scalingConfig: {
            autoscalingConfig: {
              autoscalingEnabled: true,
              autoscalingFactor: 42,
              limitConfig: {
                maxScalingFactor: 42,
                minScalingFactor: 42,
              },
            },
            scalingFactor: 42,
          },
          scheduledBackup: {
            backupLocation: 'Test string',
            cronSchedule: 'Test string',
            enabled: true,
            latestBackup: {
              backupId: 'Test string',
              duration: 'Test string',
              startTime: 'Test string',
              state: 'Test string',
            },
            nextScheduledTime: 'Test string',
            timeZone: 'Test string',
          },
          state: 'Test string',
          stateMessage: 'Test string',
          uid: 'Test string',
          updateTime: 'Test string',
          warehouseGcsUri: 'Test string',
        },
        state: 'Test string',
      }
    );
    /** Deletes a single backup. */
    await gapi.client.metastore.projects.locations.services.backups.delete({
      name: 'Test string',
      requestId: 'Test string',
    });
    /** Gets details of a single backup. */
    await gapi.client.metastore.projects.locations.services.backups.get({
      name: 'Test string',
    });
    /** Lists backups in a service. */
    await gapi.client.metastore.projects.locations.services.backups.list({
      filter: 'Test string',
      orderBy: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
      parent: 'Test string',
    });
    /** Deletes a single migration execution. */
    await gapi.client.metastore.projects.locations.services.migrationExecutions.delete(
      {
        name: 'Test string',
        requestId: 'Test string',
      }
    );
    /** Gets details of a single migration execution. */
    await gapi.client.metastore.projects.locations.services.migrationExecutions.get(
      {
        name: 'Test string',
      }
    );
    /** Lists migration executions on a service. */
    await gapi.client.metastore.projects.locations.services.migrationExecutions.list(
      {
        filter: 'Test string',
        orderBy: 'Test string',
        pageSize: 42,
        pageToken: 'Test string',
        parent: 'Test string',
      }
    );
  }
});