/* This is stub file for gapi.client.merchantapi-conversions_v1beta definition tests */
// IMPORTANT
// This file was generated by https://github.com/Maxim-Mazurok/google-api-typings-generator. Please do not edit it manually.
// In case of any problems please post issue to https://github.com/Maxim-Mazurok/google-api-typings-generator

// Revision: 20240614

gapi.load('client', async () => {
  /** now we can use gapi.client */

  await gapi.client.load(
    'https://merchantapi.googleapis.com/$discovery/rest?version=conversions_v1beta'
  );
  /** now we can use gapi.client.merchantapi */

  /** don't forget to authenticate your client before sending any request to resources: */
  /** declare client_id registered in Google Developers Console */
  const client_id = '<<PUT YOUR CLIENT ID HERE>>';
  const scope = [
    /** Manage your product listings and accounts for Google Shopping */
    'https://www.googleapis.com/auth/content',
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
    /** Creates a new conversion source. */
    await gapi.client.merchantapi.accounts.conversionSources.create(
      {
        parent: 'Test string',
      },
      {
        controller: 'Test string',
        expireTime: 'Test string',
        googleAnalyticsLink: {
          attributionSettings: {
            attributionLookbackWindowDays: 42,
            attributionModel: 'Test string',
            conversionType: [
              {
                name: 'Test string',
                report: true,
              },
            ],
          },
          property: 'Test string',
          propertyId: 'Test string',
        },
        merchantCenterDestination: {
          attributionSettings: {
            attributionLookbackWindowDays: 42,
            attributionModel: 'Test string',
            conversionType: [
              {
                name: 'Test string',
                report: true,
              },
            ],
          },
          currencyCode: 'Test string',
          destination: 'Test string',
          displayName: 'Test string',
        },
        name: 'Test string',
        state: 'Test string',
      }
    );
    /** Archives an existing conversion source. If the conversion source is a Merchant Center Destination, it will be recoverable for 30 days. If the conversion source is a Google Analytics Link, it will be deleted immediately and can be restored by creating a new one. */
    await gapi.client.merchantapi.accounts.conversionSources.delete({
      name: 'Test string',
    });
    /** Fetches a conversion source. */
    await gapi.client.merchantapi.accounts.conversionSources.get({
      name: 'Test string',
    });
    /** Retrieves the list of conversion sources the caller has access to. */
    await gapi.client.merchantapi.accounts.conversionSources.list({
      pageSize: 42,
      pageToken: 'Test string',
      parent: 'Test string',
      showDeleted: true,
    });
    /** Updates information of an existing conversion source. Available only for Merchant Center Destination conversion sources. */
    await gapi.client.merchantapi.accounts.conversionSources.patch(
      {
        name: 'Test string',
        updateMask: 'Test string',
      },
      {
        controller: 'Test string',
        expireTime: 'Test string',
        googleAnalyticsLink: {
          attributionSettings: {
            attributionLookbackWindowDays: 42,
            attributionModel: 'Test string',
            conversionType: [
              {
                name: 'Test string',
                report: true,
              },
            ],
          },
          property: 'Test string',
          propertyId: 'Test string',
        },
        merchantCenterDestination: {
          attributionSettings: {
            attributionLookbackWindowDays: 42,
            attributionModel: 'Test string',
            conversionType: [
              {
                name: 'Test string',
                report: true,
              },
            ],
          },
          currencyCode: 'Test string',
          destination: 'Test string',
          displayName: 'Test string',
        },
        name: 'Test string',
        state: 'Test string',
      }
    );
    /** Re-enables an archived conversion source. Only Available for Merchant Center Destination conversion sources. */
    await gapi.client.merchantapi.accounts.conversionSources.undelete(
      {
        name: 'Test string',
      },
      {}
    );
  }
});