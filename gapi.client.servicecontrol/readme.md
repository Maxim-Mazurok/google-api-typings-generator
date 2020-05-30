# TypeScript typings for Service Control API v1

Provides control plane functionality to managed services, such as logging, monitoring, and status checks.
For detailed description please check [documentation](https://cloud.google.com/service-control/).

## Installing

Install typings for Service Control API:

```
npm install @types/gapi.client.servicecontrol@v1 --save-dev
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
gapi.client.load('servicecontrol', 'v1', () => {
  // now we can use gapi.client.servicecontrol
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

      // Manage your Google Service Control data
      'https://www.googleapis.com/auth/servicecontrol',
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

After that you can use Service Control API resources:

```typescript

/*
Attempts to allocate quota for the specified consumer. It should be called
before the operation is executed.

This method requires the `servicemanagement.services.quota`
permission on the specified service. For more information, see
[Cloud IAM](https://cloud.google.com/iam).

**NOTE:** The client **must** fail-open on server errors `INTERNAL`,
`UNKNOWN`, `DEADLINE_EXCEEDED`, and `UNAVAILABLE`. To ensure system
reliability, the server may inject these errors to prohibit any hard
dependency on the quota functionality.
*/
await gapi.client.servicecontrol.services.allocateQuota({ serviceName: "serviceName",  });

/*
Checks whether an operation on a service should be allowed to proceed
based on the configuration of the service and related policies. It must be
called before the operation is executed.

If feasible, the client should cache the check results and reuse them for
60 seconds. In case of any server errors, the client should rely on the
cached results for much longer time to avoid outage.
WARNING: There is general 60s delay for the configuration and policy
propagation, therefore callers MUST NOT depend on the `Check` method having
the latest policy information.

NOTE: the CheckRequest has the size limit of 64KB.

This method requires the `servicemanagement.services.check` permission
on the specified service. For more information, see
[Cloud IAM](https://cloud.google.com/iam).
*/
await gapi.client.servicecontrol.services.check({ serviceName: "serviceName",  });

/*
Reports operation results to Google Service Control, such as logs and
metrics. It should be called after an operation is completed.

If feasible, the client should aggregate reporting data for up to 5
seconds to reduce API traffic. Limiting aggregation to 5 seconds is to
reduce data loss during client crashes. Clients should carefully choose
the aggregation time window to avoid data loss risk more than 0.01%
for business and compliance reasons.

NOTE: the ReportRequest has the size limit (wire-format byte size) of
1MB.

This method requires the `servicemanagement.services.report` permission
on the specified service. For more information, see
[Google Cloud IAM](https://cloud.google.com/iam).
*/
await gapi.client.servicecontrol.services.report({ serviceName: "serviceName",  });
```
