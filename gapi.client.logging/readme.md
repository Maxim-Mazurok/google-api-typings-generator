# TypeScript typings for Cloud Logging API v2

Writes log entries and manages your Cloud Logging configuration. The table entries below are presented in alphabetical order, not in order of common use. For explanations of the concepts found in the table entries, read the documentation at https://cloud.google.com/logging/docs.
For detailed description please check [documentation](https://cloud.google.com/logging/docs/).

## Installing

Install typings for Cloud Logging API:

```
npm install @types/gapi.client.logging@v2 --save-dev
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
gapi.client.load('logging', 'v2', () => {
  // now we can use gapi.client.logging
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View and manage your data across Google Cloud Platform services
      'https://www.googleapis.com/auth/cloud-platform',

      // View your data across Google Cloud Platform services
      'https://www.googleapis.com/auth/cloud-platform.read-only',

      // Administrate log data for your projects
      'https://www.googleapis.com/auth/logging.admin',

      // View log data for your projects
      'https://www.googleapis.com/auth/logging.read',

      // Submit log data for your projects
      'https://www.googleapis.com/auth/logging.write',
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

After that you can use Cloud Logging API resources:

```typescript

/*
Lists log entries. Use this method to retrieve log entries that originated from a project/folder/organization/billing account. For ways to export log entries, see Exporting Logs (https://cloud.google.com/logging/docs/export).
*/
await gapi.client.logging.entries.list({  });

/*
Writes log entries to Logging. This API method is the only way to send log entries to Logging. This method is used, directly or indirectly, by the Logging agent (fluentd) and all logging libraries configured to use Logging. A single request may contain log entries for a maximum of 1000 different resources (projects, organizations, billing accounts or folders)
*/
await gapi.client.logging.entries.write({  });

/*
Creates a new exclusion in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource.
*/
await gapi.client.logging.exclusions.create({ parent: "parent",  });

/*
Deletes an exclusion.
*/
await gapi.client.logging.exclusions.delete({ name: "name",  });

/*
Gets the description of an exclusion.
*/
await gapi.client.logging.exclusions.get({ name: "name",  });

/*
Lists all the exclusions in a parent resource.
*/
await gapi.client.logging.exclusions.list({ parent: "parent",  });

/*
Changes one or more properties of an existing exclusion.
*/
await gapi.client.logging.exclusions.patch({ name: "name",  });

/*
Deletes all the log entries in a log. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted.
*/
await gapi.client.logging.logs.delete({ logName: "logName",  });

/*
Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed.
*/
await gapi.client.logging.logs.list({ parent: "parent",  });

/*
Lists the descriptors for monitored resource types used by Logging.
*/
await gapi.client.logging.monitoredResourceDescriptors.list({  });

/*
Gets the Logs Router CMEK settings for the given resource.Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.See Enabling CMEK for Logs Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
*/
await gapi.client.logging.organizations.getCmekSettings({ name: "name",  });

/*
Updates the Logs Router CMEK settings for the given resource.Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.UpdateCmekSettings will fail if 1) kms_key_name is invalid, or 2) the associated service account does not have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key, or 3) access to the key is disabled.See Enabling CMEK for Logs Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
*/
await gapi.client.logging.organizations.updateCmekSettings({ name: "name",  });

/*
Creates a sink that exports specified log entries to a destination. The export of newly-ingested log entries begins immediately, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink.
*/
await gapi.client.logging.sinks.create({ parent: "parent",  });

/*
Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted.
*/
await gapi.client.logging.sinks.delete({ sinkName: "sinkName",  });

/*
Gets a sink.
*/
await gapi.client.logging.sinks.get({ sinkName: "sinkName",  });

/*
Lists sinks.
*/
await gapi.client.logging.sinks.list({ parent: "parent",  });

/*
Updates a sink. This method replaces the following fields in the existing sink with values from the new sink: destination, and filter.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
*/
await gapi.client.logging.sinks.update({ sinkName: "sinkName",  });

/*
Gets the Logs Router CMEK settings for the given resource.Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.See Enabling CMEK for Logs Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
*/
await gapi.client.logging.v2.getCmekSettings({ name: "name",  });

/*
Updates the Logs Router CMEK settings for the given resource.Note: CMEK for the Logs Router can currently only be configured for GCP organizations. Once configured, it applies to all projects and folders in the GCP organization.UpdateCmekSettings will fail if 1) kms_key_name is invalid, or 2) the associated service account does not have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key, or 3) access to the key is disabled.See Enabling CMEK for Logs Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
*/
await gapi.client.logging.v2.updateCmekSettings({ name: "name",  });
```
