# TypeScript typings for Cloud SQL Admin API v1

API for Cloud SQL database instance management
For detailed description please check [documentation](https://developers.google.com/cloud-sql/).

## Installing

Install typings for Cloud SQL Admin API:

```
npm install @types/gapi.client.sqladmin-v1 --save-dev
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
  'https://sqladmin.googleapis.com/$discovery/rest?version=v1',
  () => {
    // now we can use:
    // gapi.client.sql
  },
);
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('sqladmin', 'v1', () => {
  // now we can use:
  // gapi.client.sql
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
    // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
    'https://www.googleapis.com/auth/cloud-platform',

    // Manage your Google SQL Service instances
    'https://www.googleapis.com/auth/sqlservice.admin',
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

After that you can use Cloud SQL Admin API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript
/*
Deletes the backup taken by a backup run.
*/
await gapi.client.sql.backupRuns.delete({
  id: 'id',
  instance: 'instance',
  project: 'project',
});

/*
Retrieves a resource containing information about a backup run.
*/
await gapi.client.sql.backupRuns.get({
  id: 'id',
  instance: 'instance',
  project: 'project',
});

/*
Creates a new backup run on demand.
*/
await gapi.client.sql.backupRuns.insert({
  instance: 'instance',
  project: 'project',
});

/*
Lists all backup runs associated with the project or a given instance and configuration in the reverse chronological order of the backup initiation time.
*/
await gapi.client.sql.backupRuns.list({
  instance: 'instance',
  project: 'project',
});

/*
Creates a backup for a Cloud SQL instance. This API can be used only to create on-demand backups.
*/
await gapi.client.sql.Backups.CreateBackup({parent: 'parent'});

/*
Deletes the backup.
*/
await gapi.client.sql.Backups.DeleteBackup({name: 'name'});

/*
Retrieves a resource containing information about a backup.
*/
await gapi.client.sql.Backups.GetBackup({name: 'name'});

/*
Lists all backups associated with the project.
*/
await gapi.client.sql.Backups.ListBackups({parent: 'parent'});

/*
Updates the retention period and description of the backup. You can use this API to update final backups only.
*/
await gapi.client.sql.Backups.UpdateBackup({name: 'name'});

/*
Generates a short-lived X509 certificate containing the provided public key and signed by a private key specific to the target instance. Users may use the certificate to authenticate as themselves when connecting to the database.
*/
await gapi.client.sql.connect.generateEphemeral({
  instance: 'instance',
  project: 'project',
});

/*
Retrieves connect settings about a Cloud SQL instance.
*/
await gapi.client.sql.connect.get({instance: 'instance', project: 'project'});

/*
Deletes a database from a Cloud SQL instance.
*/
await gapi.client.sql.databases.delete({
  database: 'database',
  instance: 'instance',
  project: 'project',
});

/*
Retrieves a resource containing information about a database inside a Cloud SQL instance.
*/
await gapi.client.sql.databases.get({
  database: 'database',
  instance: 'instance',
  project: 'project',
});

/*
Inserts a resource containing information about a database inside a Cloud SQL instance. **Note:** You can't modify the default character set and collation.
*/
await gapi.client.sql.databases.insert({
  instance: 'instance',
  project: 'project',
});

/*
Lists databases in the specified Cloud SQL instance.
*/
await gapi.client.sql.databases.list({
  instance: 'instance',
  project: 'project',
});

/*
Partially updates a resource containing information about a database inside a Cloud SQL instance. This method supports patch semantics.
*/
await gapi.client.sql.databases.patch({
  database: 'database',
  instance: 'instance',
  project: 'project',
});

/*
Updates a resource containing information about a database inside a Cloud SQL instance.
*/
await gapi.client.sql.databases.update({
  database: 'database',
  instance: 'instance',
  project: 'project',
});

/*
Lists all available database flags for Cloud SQL instances.
*/
await gapi.client.sql.flags.list({});

/*
Acquire a lease for the setup of SQL Server Reporting Services (SSRS).
*/
await gapi.client.sql.instances.acquireSsrsLease({
  instance: 'instance',
  project: 'project',
});

/*
Adds a new trusted Certificate Authority (CA) version for the specified instance. Required to prepare for a certificate rotation. If a CA version was previously added but never used in a certificate rotation, this operation replaces that version. There cannot be more than one CA version waiting to be rotated in. For instances that have enabled Certificate Authority Service (CAS) based server CA, use AddServerCertificate to add a new server certificate.
*/
await gapi.client.sql.instances.addServerCa({
  instance: 'instance',
  project: 'project',
});

/*
Add a new trusted server certificate version for the specified instance using Certificate Authority Service (CAS) server CA. Required to prepare for a certificate rotation. If a server certificate version was previously added but never used in a certificate rotation, this operation replaces that version. There cannot be more than one certificate version waiting to be rotated in. For instances not using CAS server CA, use AddServerCa instead.
*/
await gapi.client.sql.instances.addServerCertificate({
  instance: 'instance',
  project: 'project',
});

/*
Creates a Cloud SQL instance as a clone of the source instance. Using this operation might cause your instance to restart.
*/
await gapi.client.sql.instances.clone({
  instance: 'instance',
  project: 'project',
});

/*
Deletes a Cloud SQL instance.
*/
await gapi.client.sql.instances.delete({
  instance: 'instance',
  project: 'project',
});

/*
Demotes an existing standalone instance to be a Cloud SQL read replica for an external database server.
*/
await gapi.client.sql.instances.demote({
  instance: 'instance',
  project: 'project',
});

/*
Demotes the stand-alone instance to be a Cloud SQL read replica for an external database server.
*/
await gapi.client.sql.instances.demoteMaster({
  instance: 'instance',
  project: 'project',
});

/*
Exports data from a Cloud SQL instance to a Cloud Storage bucket as a SQL dump or CSV file.
*/
await gapi.client.sql.instances.export({
  instance: 'instance',
  project: 'project',
});

/*
Initiates a manual failover of a high availability (HA) primary instance to a standby instance, which becomes the primary instance. Users are then rerouted to the new primary. For more information, see the [Overview of high availability](https://cloud.google.com/sql/docs/mysql/high-availability) page in the Cloud SQL documentation. If using Legacy HA (MySQL only), this causes the instance to failover to its failover replica instance.
*/
await gapi.client.sql.instances.failover({
  instance: 'instance',
  project: 'project',
});

/*
Retrieves a resource containing information about a Cloud SQL instance.
*/
await gapi.client.sql.instances.get({instance: 'instance', project: 'project'});

/*
Imports data into a Cloud SQL instance from a SQL dump or CSV file in Cloud Storage.
*/
await gapi.client.sql.instances.import({
  instance: 'instance',
  project: 'project',
});

/*
Creates a new Cloud SQL instance.
*/
await gapi.client.sql.instances.insert({project: 'project'});

/*
Lists instances under a given project.
*/
await gapi.client.sql.instances.list({project: 'project'});

/*
Lists all of the trusted Certificate Authorities (CAs) for the specified instance. There can be up to three CAs listed: the CA that was used to sign the certificate that is currently in use, a CA that has been added but not yet used to sign a certificate, and a CA used to sign a certificate that has previously rotated out.
*/
await gapi.client.sql.instances.listServerCas({
  instance: 'instance',
  project: 'project',
});

/*
Lists all versions of server certificates and certificate authorities (CAs) for the specified instance. There can be up to three sets of certs listed: the certificate that is currently in use, a future that has been added but not yet used to sign a certificate, and a certificate that has been rotated out. For instances not using Certificate Authority Service (CAS) server CA, use ListServerCas instead.
*/
await gapi.client.sql.instances.ListServerCertificates({
  instance: 'instance',
  project: 'project',
});

/*
Partially updates settings of a Cloud SQL instance by merging the request with the current configuration. This method supports patch semantics.
*/
await gapi.client.sql.instances.patch({
  instance: 'instance',
  project: 'project',
});

/*
Promotes the read replica instance to be an independent Cloud SQL primary instance. Using this operation might cause your instance to restart.
*/
await gapi.client.sql.instances.promoteReplica({
  instance: 'instance',
  project: 'project',
});

/*
Reencrypt CMEK instance with latest key version.
*/
await gapi.client.sql.instances.reencrypt({
  instance: 'instance',
  project: 'project',
});

/*
Release a lease for the setup of SQL Server Reporting Services (SSRS).
*/
await gapi.client.sql.instances.releaseSsrsLease({
  instance: 'instance',
  project: 'project',
});

/*
Deletes all client certificates and generates a new server SSL certificate for the instance.
*/
await gapi.client.sql.instances.resetSslConfig({
  instance: 'instance',
  project: 'project',
});

/*
Restarts a Cloud SQL instance.
*/
await gapi.client.sql.instances.restart({
  instance: 'instance',
  project: 'project',
});

/*
Restores a backup of a Cloud SQL instance. Using this operation might cause your instance to restart.
*/
await gapi.client.sql.instances.restoreBackup({
  instance: 'instance',
  project: 'project',
});

/*
Rotates the server certificate to one signed by the Certificate Authority (CA) version previously added with the addServerCA method. For instances that have enabled Certificate Authority Service (CAS) based server CA, use RotateServerCertificate to rotate the server certificate.
*/
await gapi.client.sql.instances.rotateServerCa({
  instance: 'instance',
  project: 'project',
});

/*
Rotates the server certificate version to one previously added with the addServerCertificate method. For instances not using Certificate Authority Service (CAS) server CA, use RotateServerCa instead.
*/
await gapi.client.sql.instances.RotateServerCertificate({
  instance: 'instance',
  project: 'project',
});

/*
Starts the replication in the read replica instance.
*/
await gapi.client.sql.instances.startReplica({
  instance: 'instance',
  project: 'project',
});

/*
Stops the replication in the read replica instance.
*/
await gapi.client.sql.instances.stopReplica({
  instance: 'instance',
  project: 'project',
});

/*
Switches over from the primary instance to the DR replica instance.
*/
await gapi.client.sql.instances.switchover({
  instance: 'instance',
  project: 'project',
});

/*
Truncate MySQL general and slow query log tables MySQL only.
*/
await gapi.client.sql.instances.truncateLog({
  instance: 'instance',
  project: 'project',
});

/*
Updates settings of a Cloud SQL instance. Using this operation might cause your instance to restart.
*/
await gapi.client.sql.instances.update({
  instance: 'instance',
  project: 'project',
});

/*
Cancels an instance operation that has been performed on an instance.
*/
await gapi.client.sql.operations.cancel({
  operation: 'operation',
  project: 'project',
});

/*
Retrieves an instance operation that has been performed on an instance.
*/
await gapi.client.sql.operations.get({
  operation: 'operation',
  project: 'project',
});

/*
Lists all instance operations that have been performed on the given Cloud SQL instance in the reverse chronological order of the start time.
*/
await gapi.client.sql.operations.list({project: 'project'});

/*
Generates a short-lived X509 certificate containing the provided public key and signed by a private key specific to the target instance. Users may use the certificate to authenticate as themselves when connecting to the database.
*/
await gapi.client.sql.sslCerts.createEphemeral({
  instance: 'instance',
  project: 'project',
});

/*
Deletes the SSL certificate. For First Generation instances, the certificate remains valid until the instance is restarted.
*/
await gapi.client.sql.sslCerts.delete({
  instance: 'instance',
  project: 'project',
  sha1Fingerprint: 'sha1Fingerprint',
});

/*
Retrieves a particular SSL certificate. Does not include the private key (required for usage). The private key must be saved from the response to initial creation.
*/
await gapi.client.sql.sslCerts.get({
  instance: 'instance',
  project: 'project',
  sha1Fingerprint: 'sha1Fingerprint',
});

/*
Creates an SSL certificate and returns it along with the private key and server certificate authority. The new certificate will not be usable until the instance is restarted.
*/
await gapi.client.sql.sslCerts.insert({
  instance: 'instance',
  project: 'project',
});

/*
Lists all of the current SSL certificates for the instance.
*/
await gapi.client.sql.sslCerts.list({instance: 'instance', project: 'project'});

/*
Lists all available machine types (tiers) for Cloud SQL, for example, `db-custom-1-3840`. For more information, see https://cloud.google.com/sql/pricing.
*/
await gapi.client.sql.tiers.list({project: 'project'});

/*
Deletes a user from a Cloud SQL instance.
*/
await gapi.client.sql.users.delete({instance: 'instance', project: 'project'});

/*
Retrieves a resource containing information about a user.
*/
await gapi.client.sql.users.get({
  instance: 'instance',
  name: 'name',
  project: 'project',
});

/*
Creates a new user in a Cloud SQL instance.
*/
await gapi.client.sql.users.insert({instance: 'instance', project: 'project'});

/*
Lists users in the specified Cloud SQL instance.
*/
await gapi.client.sql.users.list({instance: 'instance', project: 'project'});

/*
Updates an existing user in a Cloud SQL instance.
*/
await gapi.client.sql.users.update({instance: 'instance', project: 'project'});
```
