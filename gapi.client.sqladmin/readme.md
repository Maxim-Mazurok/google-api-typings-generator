# TypeScript typings for Cloud SQL Admin API v1

API for Cloud SQL database instance management
For detailed description please check [documentation](https://developers.google.com/cloud-sql/).

## Installing

Install typings for Cloud SQL Admin API:

```
npm install @types/gapi.client.sqladmin@v1 --save-dev
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
gapi.client.load('sqladmin', 'v1', () => {
  // now we can use gapi.client.sqladmin
  // ...
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
  { client_id: client_id, scope: scope, immediate: immediate },
  authResult => {
    if (authResult && !authResult.error) {
        /* handle successful authorization */
    } else {
        /* handle authorization error */
    }
});
```

After that you can use Cloud SQL Admin API resources:

```typescript

/*
Deletes the backup taken by a backup run.
*/
await gapi.client.sqladmin.backupRuns.delete({ id: "id", instance: "instance", project: "project",  });

/*
Retrieves a resource containing information about a backup run.
*/
await gapi.client.sqladmin.backupRuns.get({ id: "id", instance: "instance", project: "project",  });

/*
Creates a new backup run on demand.
*/
await gapi.client.sqladmin.backupRuns.insert({ instance: "instance", project: "project",  });

/*
Lists all backup runs associated with the project or a given instance and configuration in the reverse chronological order of the backup initiation time.
*/
await gapi.client.sqladmin.backupRuns.list({ instance: "instance", project: "project",  });

/*
Generates a short-lived X509 certificate containing the provided public key and signed by a private key specific to the target instance. Users may use the certificate to authenticate as themselves when connecting to the database.
*/
await gapi.client.sqladmin.connect.generateEphemeralCert({ instance: "instance", project: "project",  });

/*
Retrieves connect settings about a Cloud SQL instance.
*/
await gapi.client.sqladmin.connect.get({ instance: "instance", project: "project",  });

/*
Deletes a database from a Cloud SQL instance.
*/
await gapi.client.sqladmin.databases.delete({ database: "database", instance: "instance", project: "project",  });

/*
Retrieves a resource containing information about a database inside a Cloud SQL instance.
*/
await gapi.client.sqladmin.databases.get({ database: "database", instance: "instance", project: "project",  });

/*
Inserts a resource containing information about a database inside a Cloud SQL instance.
*/
await gapi.client.sqladmin.databases.insert({ instance: "instance", project: "project",  });

/*
Lists databases in the specified Cloud SQL instance.
*/
await gapi.client.sqladmin.databases.list({ instance: "instance", project: "project",  });

/*
Partially updates a resource containing information about a database inside a Cloud SQL instance. This method supports patch semantics.
*/
await gapi.client.sqladmin.databases.patch({ database: "database", instance: "instance", project: "project",  });

/*
Updates a resource containing information about a database inside a Cloud SQL instance.
*/
await gapi.client.sqladmin.databases.update({ database: "database", instance: "instance", project: "project",  });

/*
Lists all available database flags for Cloud SQL instances.
*/
await gapi.client.sqladmin.flags.list({  });

/*
Adds a new trusted Certificate Authority (CA) version for the specified instance. Required to prepare for a certificate rotation. If a CA version was previously added but never used in a certificate rotation, this operation replaces that version. There cannot be more than one CA version waiting to be rotated in.
*/
await gapi.client.sqladmin.instances.addServerCa({ instance: "instance", project: "project",  });

/*
Creates a Cloud SQL instance as a clone of the source instance. Using this operation might cause your instance to restart.
*/
await gapi.client.sqladmin.instances.clone({ instance: "instance", project: "project",  });

/*
Deletes a Cloud SQL instance.
*/
await gapi.client.sqladmin.instances.delete({ instance: "instance", project: "project",  });

/*
Demotes the stand-alone instance to be a Cloud SQL read replica for an external database server.
*/
await gapi.client.sqladmin.instances.demoteMaster({ instance: "instance", project: "project",  });

/*
Exports data from a Cloud SQL instance to a Cloud Storage bucket as a SQL dump or CSV file.
*/
await gapi.client.sqladmin.instances.export({ instance: "instance", project: "project",  });

/*
Initiates a manual failover of a high availability (HA) primary instance to a standby instance, which becomes the primary instance. Users are then rerouted to the new primary. For more information, see the [Overview of high availability](https://cloud.google.com/sql/docs/mysql/high-availability) page in the Cloud SQL documentation. If using Legacy HA (MySQL only), this causes the instance to failover to its failover replica instance.
*/
await gapi.client.sqladmin.instances.failover({ instance: "instance", project: "project",  });

/*
Retrieves a resource containing information about a Cloud SQL instance.
*/
await gapi.client.sqladmin.instances.get({ instance: "instance", project: "project",  });

/*
Imports data into a Cloud SQL instance from a SQL dump or CSV file in Cloud Storage.
*/
await gapi.client.sqladmin.instances.import({ instance: "instance", project: "project",  });

/*
Creates a new Cloud SQL instance.
*/
await gapi.client.sqladmin.instances.insert({ project: "project",  });

/*
Lists instances under a given project.
*/
await gapi.client.sqladmin.instances.list({ project: "project",  });

/*
Lists all of the trusted Certificate Authorities (CAs) for the specified instance. There can be up to three CAs listed: the CA that was used to sign the certificate that is currently in use, a CA that has been added but not yet used to sign a certificate, and a CA used to sign a certificate that has previously rotated out.
*/
await gapi.client.sqladmin.instances.listServerCas({ instance: "instance", project: "project",  });

/*
Updates settings of a Cloud SQL instance. This method supports patch semantics.
*/
await gapi.client.sqladmin.instances.patch({ instance: "instance", project: "project",  });

/*
Promotes the read replica instance to be a stand-alone Cloud SQL instance. Using this operation might cause your instance to restart.
*/
await gapi.client.sqladmin.instances.promoteReplica({ instance: "instance", project: "project",  });

/*
Deletes all client certificates and generates a new server SSL certificate for the instance.
*/
await gapi.client.sqladmin.instances.resetSslConfig({ instance: "instance", project: "project",  });

/*
Restarts a Cloud SQL instance.
*/
await gapi.client.sqladmin.instances.restart({ instance: "instance", project: "project",  });

/*
Restores a backup of a Cloud SQL instance. Using this operation might cause your instance to restart.
*/
await gapi.client.sqladmin.instances.restoreBackup({ instance: "instance", project: "project",  });

/*
Rotates the server certificate to one signed by the Certificate Authority (CA) version previously added with the addServerCA method.
*/
await gapi.client.sqladmin.instances.rotateServerCa({ instance: "instance", project: "project",  });

/*
Starts the replication in the read replica instance.
*/
await gapi.client.sqladmin.instances.startReplica({ instance: "instance", project: "project",  });

/*
Stops the replication in the read replica instance.
*/
await gapi.client.sqladmin.instances.stopReplica({ instance: "instance", project: "project",  });

/*
Truncate MySQL general and slow query log tables MySQL only.
*/
await gapi.client.sqladmin.instances.truncateLog({ instance: "instance", project: "project",  });

/*
Updates settings of a Cloud SQL instance. Using this operation might cause your instance to restart.
*/
await gapi.client.sqladmin.instances.update({ instance: "instance", project: "project",  });

/*
Retrieves an instance operation that has been performed on an instance.
*/
await gapi.client.sqladmin.operations.get({ operation: "operation", project: "project",  });

/*
Lists all instance operations that have been performed on the given Cloud SQL instance in the reverse chronological order of the start time.
*/
await gapi.client.sqladmin.operations.list({ project: "project",  });

/*
Generates a short-lived X509 certificate containing the provided public key and signed by a private key specific to the target instance. Users may use the certificate to authenticate as themselves when connecting to the database.
*/
await gapi.client.sqladmin.sslCerts.createEphemeral({ instance: "instance", project: "project",  });

/*
Deletes the SSL certificate. For First Generation instances, the certificate remains valid until the instance is restarted.
*/
await gapi.client.sqladmin.sslCerts.delete({ instance: "instance", project: "project", sha1Fingerprint: "sha1Fingerprint",  });

/*
Retrieves a particular SSL certificate. Does not include the private key (required for usage). The private key must be saved from the response to initial creation.
*/
await gapi.client.sqladmin.sslCerts.get({ instance: "instance", project: "project", sha1Fingerprint: "sha1Fingerprint",  });

/*
Creates an SSL certificate and returns it along with the private key and server certificate authority. The new certificate will not be usable until the instance is restarted.
*/
await gapi.client.sqladmin.sslCerts.insert({ instance: "instance", project: "project",  });

/*
Lists all of the current SSL certificates for the instance.
*/
await gapi.client.sqladmin.sslCerts.list({ instance: "instance", project: "project",  });

/*
Lists all available machine types (tiers) for Cloud SQL, for example, `db-custom-1-3840`. For more information, see https://cloud.google.com/sql/pricing.
*/
await gapi.client.sqladmin.tiers.list({ project: "project",  });

/*
Deletes a user from a Cloud SQL instance.
*/
await gapi.client.sqladmin.users.delete({ instance: "instance", project: "project",  });

/*
Retrieves a resource containing information about a user.
*/
await gapi.client.sqladmin.users.get({ instance: "instance", name: "name", project: "project",  });

/*
Creates a new user in a Cloud SQL instance.
*/
await gapi.client.sqladmin.users.insert({ instance: "instance", project: "project",  });

/*
Lists users in the specified Cloud SQL instance.
*/
await gapi.client.sqladmin.users.list({ instance: "instance", project: "project",  });

/*
Updates an existing user in a Cloud SQL instance.
*/
await gapi.client.sqladmin.users.update({ instance: "instance", project: "project",  });
```
