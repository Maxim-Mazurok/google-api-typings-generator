/* Type definitions for non-npm package Merchant API conversions_v1beta 0.0 */
// Project: https://developers.devsite.corp.google.com/merchant/api
// Definitions by: Maxim Mazurok <https://github.com/Maxim-Mazurok>
//                 Nick Amoscato <https://github.com/namoscato>
//                 Declan Vong <https://github.com/declanvong>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// IMPORTANT
// This file was generated by https://github.com/Maxim-Mazurok/google-api-typings-generator. Please do not edit it manually.
// In case of any problems please post issue to https://github.com/Maxim-Mazurok/google-api-typings-generator
// Generated from: https://merchantapi.googleapis.com/$discovery/rest?version=conversions_v1beta
// Revision: 20240614

/// <reference types="gapi.client" />

declare namespace gapi.client {
  /** Load Merchant API conversions_v1beta */
  function load(
    urlOrObject: 'https://merchantapi.googleapis.com/$discovery/rest?version=conversions_v1beta'
  ): Promise<void>;
  /** @deprecated Please load APIs with discovery documents. */
  function load(
    name: 'merchantapi',
    version: 'conversions_v1beta'
  ): Promise<void>;
  /** @deprecated Please load APIs with discovery documents. */
  function load(
    name: 'merchantapi',
    version: 'conversions_v1beta',
    callback: () => any
  ): void;

  namespace merchantapi {
    interface AttributionSettings {
      /** Required. Lookback windows (in days) used for attribution in this source. Supported values are 7, 30, 40. */
      attributionLookbackWindowDays?: number;
      /** Required. Attribution model. */
      attributionModel?: string;
      /** Immutable. Unordered list. List of different conversion types a conversion event can be classified as. A standard "purchase" type will be automatically created if this list is empty at creation time. */
      conversionType?: ConversionType[];
    }
    interface ConversionSource {
      /** Output only. Controller of the conversion source. */
      controller?: string;
      /** Output only. The time when an archived conversion source becomes permanently deleted and is no longer available to undelete. */
      expireTime?: string;
      /** Immutable. Conversion Source of type "Link to Google Analytics Property". */
      googleAnalyticsLink?: GoogleAnalyticsLink;
      /** Conversion Source of type "Merchant Center Tag Destination". */
      merchantCenterDestination?: MerchantCenterDestination;
      /** Output only. Identifier. Generated by the Content API upon creation of a new `ConversionSource`. Format: [a-z]{4}:.+ The four characters before the colon represent the type of conversio source. Content after the colon represents the ID of the conversion source within that type. The ID of two different conversion sources might be the same across different types. The following type prefixes are supported: - galk: For GoogleAnalyticsLink sources. - mcdn: For MerchantCenterDestination sources. */
      name?: string;
      /** Output only. Current state of this conversion source. Can't be edited through the API. */
      state?: string;
    }
    interface ConversionType {
      /** Output only. Conversion event name, as it'll be reported by the client. */
      name?: string;
      /** Output only. Option indicating if the type should be included in Merchant Center reporting. */
      report?: boolean;
    }
    interface Empty {}
    interface GoogleAnalyticsLink {
      /** Output only. Attribution settings for the linked Google Analytics property. */
      attributionSettings?: AttributionSettings;
      /** Output only. Name of the Google Analytics property the merchant is linked to. */
      property?: string;
      /** Required. Immutable. ID of the Google Analytics property the merchant is linked to. */
      propertyId?: string;
    }
    interface ListConversionSourcesResponse {
      /** List of conversion sources. */
      conversionSources?: ConversionSource[];
      /** Token to be used to fetch the next results page. */
      nextPageToken?: string;
    }
    interface MerchantCenterDestination {
      /** Required. Attribution settings being used for the Merchant Center Destination. */
      attributionSettings?: AttributionSettings;
      /** Required. Three-letter currency code (ISO 4217). The currency code defines in which currency the conversions sent to this destination will be reported in Merchant Center. */
      currencyCode?: string;
      /** Output only. Merchant Center Destination ID. */
      destination?: string;
      /** Required. Merchant-specified display name for the destination. This is the name that identifies the conversion source within the Merchant Center UI. Limited to 64 characters. */
      displayName?: string;
    }
    interface ProductChange {
      /** The new value of the changed resource or attribute. */
      newValue?: string;
      /** The old value of the changed resource or attribute. */
      oldValue?: string;
      /** Countries that have the change (if applicable) */
      regionCode?: string;
      /** Reporting contexts that have the change (if applicable) */
      reportingContext?: string;
    }
    interface ProductStatusChangeMessage {
      /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
      account?: string;
      /** The attribute in the resource that changed, in this case it will be always `Status`. */
      attribute?: string;
      /** A message to describe the change that happened to the product */
      changes?: ProductChange[];
      /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
      managingAccount?: string;
      /** The product name. Format: `{product.name=accounts/{account}/products/{product}}` */
      resource?: string;
      /** The product id. */
      resourceId?: string;
      /** The resource that changed, in this case it will always be `Product`. */
      resourceType?: string;
    }
    interface UndeleteConversionSourceRequest {}
    interface ConversionSourcesResource {
      /** Creates a new conversion source. */
      create(request: {
        /** V1 error format. */
        '$.xgafv'?: string;
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: string;
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Required. The merchant account that will own the new conversion source. Format: accounts/{account} */
        parent: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** Request body */
        resource: ConversionSource;
      }): Request<ConversionSource>;
      create(
        request: {
          /** V1 error format. */
          '$.xgafv'?: string;
          /** OAuth access token. */
          access_token?: string;
          /** Data format for response. */
          alt?: string;
          /** JSONP */
          callback?: string;
          /** Selector specifying which fields to include in a partial response. */
          fields?: string;
          /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
          key?: string;
          /** OAuth 2.0 token for the current user. */
          oauth_token?: string;
          /** Required. The merchant account that will own the new conversion source. Format: accounts/{account} */
          parent: string;
          /** Returns response with indentations and line breaks. */
          prettyPrint?: boolean;
          /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
          quotaUser?: string;
          /** Upload protocol for media (e.g. "raw", "multipart"). */
          upload_protocol?: string;
          /** Legacy upload protocol for media (e.g. "media", "multipart"). */
          uploadType?: string;
        },
        body: ConversionSource
      ): Request<ConversionSource>;
      /** Archives an existing conversion source. If the conversion source is a Merchant Center Destination, it will be recoverable for 30 days. If the conversion source is a Google Analytics Link, it will be deleted immediately and can be restored by creating a new one. */
      delete(request?: {
        /** V1 error format. */
        '$.xgafv'?: string;
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: string;
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** Required. The name of the conversion source to be deleted. Format: accounts/{account}/conversionSources/{conversion_source} */
        name: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
      }): Request<{}>;
      /** Fetches a conversion source. */
      get(request?: {
        /** V1 error format. */
        '$.xgafv'?: string;
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: string;
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** Required. The name of the conversion source to be fetched. Format: accounts/{account}/conversionsources/{conversion_source} */
        name: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
      }): Request<ConversionSource>;
      /** Retrieves the list of conversion sources the caller has access to. */
      list(request?: {
        /** V1 error format. */
        '$.xgafv'?: string;
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: string;
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Optional. The maximum number of conversion sources to return in a page. If no `page_size` is specified, `100` is used as the default value. The maximum value is `200`. Values above `200` will be coerced to `200`. Regardless of pagination, at most `200` conversion sources are returned in total. */
        pageSize?: number;
        /** Optional. Page token. */
        pageToken?: string;
        /** Required. The merchant account who owns the collection of conversion sources. Format: accounts/{account} */
        parent: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Optional. Show deleted (archived) option. */
        showDeleted?: boolean;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
      }): Request<ListConversionSourcesResponse>;
      /** Updates information of an existing conversion source. Available only for Merchant Center Destination conversion sources. */
      patch(request: {
        /** V1 error format. */
        '$.xgafv'?: string;
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: string;
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** Output only. Identifier. Generated by the Content API upon creation of a new `ConversionSource`. Format: [a-z]{4}:.+ The four characters before the colon represent the type of conversio source. Content after the colon represents the ID of the conversion source within that type. The ID of two different conversion sources might be the same across different types. The following type prefixes are supported: - galk: For GoogleAnalyticsLink sources. - mcdn: For MerchantCenterDestination sources. */
        name: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Required. List of fields being updated. */
        updateMask?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** Request body */
        resource: ConversionSource;
      }): Request<ConversionSource>;
      patch(
        request: {
          /** V1 error format. */
          '$.xgafv'?: string;
          /** OAuth access token. */
          access_token?: string;
          /** Data format for response. */
          alt?: string;
          /** JSONP */
          callback?: string;
          /** Selector specifying which fields to include in a partial response. */
          fields?: string;
          /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
          key?: string;
          /** Output only. Identifier. Generated by the Content API upon creation of a new `ConversionSource`. Format: [a-z]{4}:.+ The four characters before the colon represent the type of conversio source. Content after the colon represents the ID of the conversion source within that type. The ID of two different conversion sources might be the same across different types. The following type prefixes are supported: - galk: For GoogleAnalyticsLink sources. - mcdn: For MerchantCenterDestination sources. */
          name: string;
          /** OAuth 2.0 token for the current user. */
          oauth_token?: string;
          /** Returns response with indentations and line breaks. */
          prettyPrint?: boolean;
          /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
          quotaUser?: string;
          /** Required. List of fields being updated. */
          updateMask?: string;
          /** Upload protocol for media (e.g. "raw", "multipart"). */
          upload_protocol?: string;
          /** Legacy upload protocol for media (e.g. "media", "multipart"). */
          uploadType?: string;
        },
        body: ConversionSource
      ): Request<ConversionSource>;
      /** Re-enables an archived conversion source. Only Available for Merchant Center Destination conversion sources. */
      undelete(request: {
        /** V1 error format. */
        '$.xgafv'?: string;
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: string;
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** Required. The name of the conversion source to be undeleted. Format: accounts/{account}/conversionSources/{conversion_source} */
        name: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** Request body */
        resource: UndeleteConversionSourceRequest;
      }): Request<ConversionSource>;
      undelete(
        request: {
          /** V1 error format. */
          '$.xgafv'?: string;
          /** OAuth access token. */
          access_token?: string;
          /** Data format for response. */
          alt?: string;
          /** JSONP */
          callback?: string;
          /** Selector specifying which fields to include in a partial response. */
          fields?: string;
          /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
          key?: string;
          /** Required. The name of the conversion source to be undeleted. Format: accounts/{account}/conversionSources/{conversion_source} */
          name: string;
          /** OAuth 2.0 token for the current user. */
          oauth_token?: string;
          /** Returns response with indentations and line breaks. */
          prettyPrint?: boolean;
          /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
          quotaUser?: string;
          /** Upload protocol for media (e.g. "raw", "multipart"). */
          upload_protocol?: string;
          /** Legacy upload protocol for media (e.g. "media", "multipart"). */
          uploadType?: string;
        },
        body: UndeleteConversionSourceRequest
      ): Request<ConversionSource>;
    }
    interface AccountsResource {
      conversionSources: ConversionSourcesResource;
    }

    const accounts: AccountsResource;
  }
}