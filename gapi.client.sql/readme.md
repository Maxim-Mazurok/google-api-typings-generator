# TypeScript typings for Cloud SQL Admin API v1beta4
API for Cloud SQL database instance management
For detailed description please check [documentation](https://developers.google.com/cloud-sql/).

## Installing

Install typings for Cloud SQL Admin API:
```
npm install @types/gapi.client.sql@v1beta4 --save-dev
```

## Usage

You need to initialize Google API client in your code:
```typescript
gapi.load("client", () => { 
    // now we can use gapi.client
    // ... 
});
```

Then load api client wrapper:
```typescript
gapi.client.load('sql', 'v1beta4', () => {
    // now we can use gapi.client.sql
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
    
        // Manage your Google SQL Service instances
        'https://www.googleapis.com/auth/sqlservice.admin',
    ],
    immediate = true;
// ...

gapi.auth.authorize({ client_id: client_id, scope: scope, immediate: immediate }, authResult => {
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
await gapi.client.backupRuns.delete({ id: "id", instance: "instance", project: "project",  }); 
    
/* 
Retrieves a resource containing information about a backup run.  
*/
await gapi.client.backupRuns.get({ instance: "instance", project: "project", id: "id",  }); 
    
/* 
Creates a new backup run on demand. This method is applicable only to
Second Generation instances.  
*/
await gapi.client.backupRuns.insert({ project: "project", instance: "instance",  }); 
    
/* 
Lists all backup runs associated with a given instance and configuration in
the reverse chronological order of the backup initiation time.  
*/
await gapi.client.backupRuns.list({ project: "project", instance: "instance",  }); 
    
/* 
Deletes a database from a Cloud SQL instance.  
*/
await gapi.client.databases.delete({ instance: "instance", project: "project", database: "database",  }); 
    
/* 
Retrieves a resource containing information about a database inside a Cloud
SQL instance.  
*/
await gapi.client.databases.get({ project: "project", database: "database", instance: "instance",  }); 
    
/* 
Inserts a resource containing information about a database inside a Cloud
SQL instance.  
*/
await gapi.client.databases.insert({ instance: "instance", project: "project",  }); 
    
/* 
Lists databases in the specified Cloud SQL instance.  
*/
await gapi.client.databases.list({ instance: "instance", project: "project",  }); 
    
/* 
Partially updates a resource containing information about a database inside
a Cloud SQL instance. This method supports patch semantics.
<aside
class="caution"><strong>Caution:</strong> This is not a partial update, so
you must include values for all the settings that you want to retain. For
partial updates, use <a
href="/sql/docs/db_path/admin-api/rest/v1beta4/instances/update">update</a>.</aside>  
*/
await gapi.client.databases.patch({ database: "database", instance: "instance", project: "project",  }); 
    
/* 
Updates a resource containing information about a database inside a Cloud
SQL instance.  
*/
await gapi.client.databases.update({ database: "database", instance: "instance", project: "project",  }); 
    
/* 
List all available database flags for Cloud SQL instances.  
*/
await gapi.client.flags.list({  }); 
    
/* 
Add a new trusted Certificate Authority (CA) version for the specified
instance. Required to prepare for a certificate rotation. If a CA version
was previously added but never used in a certificate rotation, this
operation replaces that version. There cannot be more than one CA version
waiting to be rotated in.  
*/
await gapi.client.instances.addServerCa({ instance: "instance", project: "project",  }); 
    
/* 
Creates a Cloud SQL instance as a clone of the source instance.  
*/
await gapi.client.instances.clone({ instance: "instance", project: "project",  }); 
    
/* 
Deletes a Cloud SQL instance.  
*/
await gapi.client.instances.delete({ project: "project", instance: "instance",  }); 
    
/* 
Demotes the stand-alone instance to be a Cloud SQL read replica for an
external database server.  
*/
await gapi.client.instances.demoteMaster({ instance: "instance", project: "project",  }); 
    
/* 
Exports data from a Cloud SQL instance to a Cloud Storage bucket as a SQL
dump or CSV file.  
*/
await gapi.client.instances.export({ project: "project", instance: "instance",  }); 
    
/* 
Failover the instance to its failover replica instance.  
*/
await gapi.client.instances.failover({ project: "project", instance: "instance",  }); 
    
/* 
Retrieves a resource containing information about a Cloud SQL instance.  
*/
await gapi.client.instances.get({ instance: "instance", project: "project",  }); 
    
/* 
Imports data into a Cloud SQL instance from a SQL dump  or CSV file in
Cloud Storage.  
*/
await gapi.client.instances.import({ project: "project", instance: "instance",  }); 
    
/* 
Creates a new Cloud SQL instance.  
*/
await gapi.client.instances.insert({ project: "project",  }); 
    
/* 
Lists instances under a given project.  
*/
await gapi.client.instances.list({ project: "project",  }); 
    
/* 
Lists all of the trusted Certificate Authorities (CAs) for the specified
instance. There can be up to three CAs listed: the CA that was used to sign
the certificate that is currently in use, a CA that has been added but not
yet used to sign a certificate, and a CA used to sign a certificate that
has previously rotated out.  
*/
await gapi.client.instances.listServerCas({ instance: "instance", project: "project",  }); 
    
/* 
Updates settings of a Cloud SQL instance.
This method supports patch semantics.  
*/
await gapi.client.instances.patch({ instance: "instance", project: "project",  }); 
    
/* 
Promotes the read replica instance to be a stand-alone Cloud SQL instance.  
*/
await gapi.client.instances.promoteReplica({ instance: "instance", project: "project",  }); 
    
/* 
Deletes all client certificates and generates a new server SSL certificate
for the instance.  
*/
await gapi.client.instances.resetSslConfig({ project: "project", instance: "instance",  }); 
    
/* 
Restarts a Cloud SQL instance.  
*/
await gapi.client.instances.restart({ project: "project", instance: "instance",  }); 
    
/* 
Restores a backup of a Cloud SQL instance.  
*/
await gapi.client.instances.restoreBackup({ instance: "instance", project: "project",  }); 
    
/* 
Rotates the server certificate to one signed by the Certificate Authority
(CA) version previously added with the addServerCA method.  
*/
await gapi.client.instances.rotateServerCa({ project: "project", instance: "instance",  }); 
    
/* 
Starts the replication in the read replica instance.  
*/
await gapi.client.instances.startReplica({ project: "project", instance: "instance",  }); 
    
/* 
Stops the replication in the read replica instance.  
*/
await gapi.client.instances.stopReplica({ instance: "instance", project: "project",  }); 
    
/* 
Truncate MySQL general and slow query log tables  
*/
await gapi.client.instances.truncateLog({ project: "project", instance: "instance",  }); 
    
/* 
Updates settings of a Cloud SQL instance.  
*/
await gapi.client.instances.update({ instance: "instance", project: "project",  }); 
    
/* 
Retrieves an instance operation that has been performed on an instance.  
*/
await gapi.client.operations.get({ project: "project", operation: "operation",  }); 
    
/* 
Lists all instance operations that have been performed on the given Cloud
SQL instance in the reverse chronological order of the start time.  
*/
await gapi.client.operations.list({ project: "project",  }); 
    
/* 
Generates a short-lived X509 certificate containing the provided public key
and signed by a private key specific to the target instance. Users may use
the certificate to authenticate as themselves when connecting to the
database.  
*/
await gapi.client.sslCerts.createEphemeral({ instance: "instance", project: "project",  }); 
    
/* 
Deletes the SSL certificate. For First Generation instances, the
certificate remains valid until the instance is restarted.  
*/
await gapi.client.sslCerts.delete({ instance: "instance", project: "project", sha1Fingerprint: "sha1Fingerprint",  }); 
    
/* 
Retrieves a particular SSL certificate.  Does not include the private key
(required for usage).  The private key must be saved from the response to
initial creation.  
*/
await gapi.client.sslCerts.get({ instance: "instance", project: "project", sha1Fingerprint: "sha1Fingerprint",  }); 
    
/* 
Creates an SSL certificate and returns it along with the private key and
server certificate authority.  The new certificate will not be usable until
the instance is restarted.  
*/
await gapi.client.sslCerts.insert({ instance: "instance", project: "project",  }); 
    
/* 
Lists all of the current SSL certificates for the instance.  
*/
await gapi.client.sslCerts.list({ instance: "instance", project: "project",  }); 
    
/* 
Lists all available machine types (tiers) for Cloud SQL, for example,
db-n1-standard-1. For related information, see <a
href="/sql/pricing">Pricing</a>.  
*/
await gapi.client.tiers.list({ project: "project",  }); 
    
/* 
Deletes a user from a Cloud SQL instance.  
*/
await gapi.client.users.delete({ project: "project", instance: "instance",  }); 
    
/* 
Creates a new user in a Cloud SQL instance.  
*/
await gapi.client.users.insert({ instance: "instance", project: "project",  }); 
    
/* 
Lists users in the specified Cloud SQL instance.  
*/
await gapi.client.users.list({ project: "project", instance: "instance",  }); 
    
/* 
Updates an existing user in a Cloud SQL instance.  
*/
await gapi.client.users.update({ instance: "instance", project: "project",  });
```
