# TypeScript typings for Cloud Logging API v2

Writes log entries and manages your Cloud Logging configuration.
For detailed description please check [documentation](https://cloud.google.com/logging/docs/).

## Installing

Install typings for Cloud Logging API:

```
npm install @types/gapi.client.logging-v2 --save-dev
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
  'https://logging.googleapis.com/$discovery/rest?version=v2',
  () => {
    // now we can use:
    // gapi.client.logging
  }
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('logging', 'v2', () => {
  // now we can use:
  // gapi.client.logging
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // View your data across Google Cloud services and see the email address of your Google Account
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
  {client_id: client_id, scope: scope, immediate: immediate},
  authResult => {
    if (authResult && !authResult.error) {
      /* handle successful authorization */
    } else {
      /* handle authorization error */
    }
  }
);
```

After that you can use Cloud Logging API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Enabling CMEK for Log Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
*/
await gapi.client.logging.billingAccounts.getCmekSettings({name: 'name'});

/*
Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://cloud.google.com/logging/docs/default-settings#view-org-settings) for more information.
*/
await gapi.client.logging.billingAccounts.getSettings({name: 'name'});

/*
Copies a set of log entries from a log bucket to a Cloud Storage bucket.
*/
await gapi.client.logging.entries.copy({});

/*
Lists log entries. Use this method to retrieve log entries that originated from a project/folder/organization/billing account. For ways to export log entries, see Exporting Logs (https://cloud.google.com/logging/docs/export).
*/
await gapi.client.logging.entries.list({});

/*
Streaming read of log entries as they are received. Until the stream is terminated, it will continue reading logs.
*/
await gapi.client.logging.entries.tail({});

/*
Writes log entries to Logging. This API method is the only way to send log entries to Logging. This method is used, directly or indirectly, by the Logging agent (fluentd) and all logging libraries configured to use Logging. A single request may contain log entries for a maximum of 1000 different resource names (projects, organizations, billing accounts or folders), where the resource name for a log entry is determined from its logName field.
*/
await gapi.client.logging.entries.write({});

/*
Creates a new exclusion in the _Default sink in a specified parent resource. Only log entries belonging to that resource can be excluded. You can have up to 10 exclusions in a resource.
*/
await gapi.client.logging.exclusions.create({parent: 'parent'});

/*
Deletes an exclusion in the _Default sink.
*/
await gapi.client.logging.exclusions.delete({name: 'name'});

/*
Gets the description of an exclusion in the _Default sink.
*/
await gapi.client.logging.exclusions.get({name: 'name'});

/*
Lists all the exclusions on the _Default sink in a parent resource.
*/
await gapi.client.logging.exclusions.list({parent: 'parent'});

/*
Changes one or more properties of an existing exclusion in the _Default sink.
*/
await gapi.client.logging.exclusions.patch({name: 'name'});

/*
Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Enabling CMEK for Log Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
*/
await gapi.client.logging.folders.getCmekSettings({name: 'name'});

/*
Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://cloud.google.com/logging/docs/default-settings#view-org-settings) for more information.
*/
await gapi.client.logging.folders.getSettings({name: 'name'});

/*
Updates the settings for the given resource. This method applies to all feature configurations for organization and folders.UpdateSettings fails when any of the following are true: The value of storage_location either isn't supported by Logging or violates the location OrgPolicy. The default_sink_config field is set, but it has an unspecified filter write mode. The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Configure default settings for organizations and folders (https://cloud.google.com/logging/docs/default-settings) for more information.
*/
await gapi.client.logging.folders.updateSettings({name: 'name'});

/*
Gets information about a location.
*/
await gapi.client.logging.locations.get({name: 'name'});

/*
Lists information about the supported locations for this service.
*/
await gapi.client.logging.locations.list({name: 'name'});

/*
Deletes all the log entries in a log for the _Default Log Bucket. The log reappears if it receives new entries. Log entries written shortly before the delete operation might not be deleted. Entries received after the delete operation with a timestamp before the operation will be deleted.
*/
await gapi.client.logging.logs.delete({logName: 'logName'});

/*
Lists the logs in projects, organizations, folders, or billing accounts. Only logs that have entries are listed.
*/
await gapi.client.logging.logs.list({parent: 'parent'});

/*
Lists the descriptors for monitored resource types used by Logging.
*/
await gapi.client.logging.monitoredResourceDescriptors.list({});

/*
Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Enabling CMEK for Log Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
*/
await gapi.client.logging.organizations.getCmekSettings({name: 'name'});

/*
Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://cloud.google.com/logging/docs/default-settings#view-org-settings) for more information.
*/
await gapi.client.logging.organizations.getSettings({name: 'name'});

/*
Updates the Log Router CMEK settings for the given resource.Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.UpdateCmekSettings fails when any of the following are true: The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Enabling CMEK for Log Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
*/
await gapi.client.logging.organizations.updateCmekSettings({name: 'name'});

/*
Updates the settings for the given resource. This method applies to all feature configurations for organization and folders.UpdateSettings fails when any of the following are true: The value of storage_location either isn't supported by Logging or violates the location OrgPolicy. The default_sink_config field is set, but it has an unspecified filter write mode. The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Configure default settings for organizations and folders (https://cloud.google.com/logging/docs/default-settings) for more information.
*/
await gapi.client.logging.organizations.updateSettings({name: 'name'});

/*
Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Enabling CMEK for Log Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
*/
await gapi.client.logging.projects.getCmekSettings({name: 'name'});

/*
Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://cloud.google.com/logging/docs/default-settings#view-org-settings) for more information.
*/
await gapi.client.logging.projects.getSettings({name: 'name'});

/*
Creates a sink that exports specified log entries to a destination. The export begins upon ingress, unless the sink's writer_identity is not permitted to write to the destination. A sink can export log entries only from the resource owning the sink.
*/
await gapi.client.logging.sinks.create({parent: 'parent'});

/*
Deletes a sink. If the sink has a unique writer_identity, then that service account is also deleted.
*/
await gapi.client.logging.sinks.delete({sinkName: 'sinkName'});

/*
Gets a sink.
*/
await gapi.client.logging.sinks.get({sinkName: 'sinkName'});

/*
Lists sinks.
*/
await gapi.client.logging.sinks.list({parent: 'parent'});

/*
Updates a sink. This method replaces the values of the destination and filter fields of the existing sink with the corresponding values from the new sink.The updated sink might also have a new writer_identity; see the unique_writer_identity field.
*/
await gapi.client.logging.sinks.update({sinkName: 'sinkName'});

/*
Gets the Logging CMEK settings for the given resource.Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.See Enabling CMEK for Log Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
*/
await gapi.client.logging.getCmekSettings({name: 'name'});

/*
Gets the settings for the given resource.Note: Settings can be retrieved for Google Cloud projects, folders, organizations, and billing accounts.See View default resource settings for Logging (https://cloud.google.com/logging/docs/default-settings#view-org-settings) for more information.
*/
await gapi.client.logging.getSettings({name: 'name'});

/*
Updates the Log Router CMEK settings for the given resource.Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.UpdateCmekSettings fails when any of the following are true: The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Enabling CMEK for Log Router (https://cloud.google.com/logging/docs/routing/managed-encryption) for more information.
*/
await gapi.client.logging.updateCmekSettings({name: 'name'});

/*
Updates the settings for the given resource. This method applies to all feature configurations for organization and folders.UpdateSettings fails when any of the following are true: The value of storage_location either isn't supported by Logging or violates the location OrgPolicy. The default_sink_config field is set, but it has an unspecified filter write mode. The value of kms_key_name is invalid. The associated service account doesn't have the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key. Access to the key is disabled.See Configure default settings for organizations and folders (https://cloud.google.com/logging/docs/default-settings) for more information.
*/
await gapi.client.logging.updateSettings({name: 'name'});
```