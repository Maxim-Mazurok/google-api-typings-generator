/* This is stub file for gapi.client.cloudcontrolspartner-v1 definition tests */
// IMPORTANT
// This file was generated by https://github.com/Maxim-Mazurok/google-api-typings-generator. Please do not edit it manually.
// In case of any problems please post issue to https://github.com/Maxim-Mazurok/google-api-typings-generator

// Revision: 20240320

gapi.load('client', async () => {
  /** now we can use gapi.client */

  await gapi.client.load(
    'https://cloudcontrolspartner.googleapis.com/$discovery/rest?version=v1'
  );
  /** now we can use gapi.client.cloudcontrolspartner */

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
    /** Get details of a Partner. */
    await gapi.client.cloudcontrolspartner.organizations.locations.getPartner({
      name: 'Test string',
    });
    /** Gets details of a single customer */
    await gapi.client.cloudcontrolspartner.organizations.locations.customers.get(
      {
        name: 'Test string',
      }
    );
    /** Lists customers of a partner identified by its Google Cloud organization ID */
    await gapi.client.cloudcontrolspartner.organizations.locations.customers.list(
      {
        filter: 'Test string',
        orderBy: 'Test string',
        pageSize: 42,
        pageToken: 'Test string',
        parent: 'Test string',
      }
    );
    /** Gets details of a single workload */
    await gapi.client.cloudcontrolspartner.organizations.locations.customers.workloads.get(
      {
        name: 'Test string',
      }
    );
    /** Gets the EKM connections associated with a workload */
    await gapi.client.cloudcontrolspartner.organizations.locations.customers.workloads.getEkmConnections(
      {
        name: 'Test string',
      }
    );
    /** Gets the partner permissions granted for a workload */
    await gapi.client.cloudcontrolspartner.organizations.locations.customers.workloads.getPartnerPermissions(
      {
        name: 'Test string',
      }
    );
    /** Lists customer workloads for a given customer org id */
    await gapi.client.cloudcontrolspartner.organizations.locations.customers.workloads.list(
      {
        filter: 'Test string',
        orderBy: 'Test string',
        pageSize: 42,
        pageToken: 'Test string',
        parent: 'Test string',
      }
    );
    /** Lists access requests associated with a workload */
    await gapi.client.cloudcontrolspartner.organizations.locations.customers.workloads.accessApprovalRequests.list(
      {
        filter: 'Test string',
        orderBy: 'Test string',
        pageSize: 42,
        pageToken: 'Test string',
        parent: 'Test string',
      }
    );
    /** Gets details of a single Violation. */
    await gapi.client.cloudcontrolspartner.organizations.locations.customers.workloads.violations.get(
      {
        name: 'Test string',
      }
    );
    /** Lists Violations for a workload Callers may also choose to read across multiple Customers or for a single customer as per [AIP-159](https://google.aip.dev/159) by using '-' (the hyphen or dash character) as a wildcard character instead of {customer} & {workload}. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` */
    await gapi.client.cloudcontrolspartner.organizations.locations.customers.workloads.violations.list(
      {
        filter: 'Test string',
        'interval.endTime': 'Test string',
        'interval.startTime': 'Test string',
        orderBy: 'Test string',
        pageSize: 42,
        pageToken: 'Test string',
        parent: 'Test string',
      }
    );
  }
});