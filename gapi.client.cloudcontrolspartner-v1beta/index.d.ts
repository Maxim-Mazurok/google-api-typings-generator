/* Type definitions for non-npm package Cloud Controls Partner API v1beta 0.0 */
// Project: https://cloud.google.com/sovereign-controls-by-partners/docs/sovereign-partners/reference/rest
// Definitions by: Maxim Mazurok <https://github.com/Maxim-Mazurok>
//                 Nick Amoscato <https://github.com/namoscato>
//                 Declan Vong <https://github.com/declanvong>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// IMPORTANT
// This file was generated by https://github.com/Maxim-Mazurok/google-api-typings-generator. Please do not edit it manually.
// In case of any problems please post issue to https://github.com/Maxim-Mazurok/google-api-typings-generator
// Generated from: https://cloudcontrolspartner.googleapis.com/$discovery/rest?version=v1beta
// Revision: 20240320

/// <reference types="gapi.client" />

declare namespace gapi.client {
  /** Load Cloud Controls Partner API v1beta */
  function load(
    urlOrObject: 'https://cloudcontrolspartner.googleapis.com/$discovery/rest?version=v1beta'
  ): Promise<void>;
  /** @deprecated Please load APIs with discovery documents. */
  function load(name: 'cloudcontrolspartner', version: 'v1beta'): Promise<void>;
  /** @deprecated Please load APIs with discovery documents. */
  function load(
    name: 'cloudcontrolspartner',
    version: 'v1beta',
    callback: () => any
  ): void;

  namespace cloudcontrolspartner {
    interface AccessApprovalRequest {
      /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/accessApprovalRequests/{access_approval_request}` */
      name?: string;
      /** The requested expiration for the approval. If the request is approved, access will be granted from the time of approval until the expiration time. */
      requestedExpirationTime?: string;
      /** The justification for which approval is being requested. */
      requestedReason?: AccessReason;
      /** The time at which approval was requested. */
      requestTime?: string;
    }
    interface AccessReason {
      /** More detail about certain reason types. See comments for each type above. */
      detail?: string;
      /** Type of access justification. */
      type?: string;
    }
    interface ConnectionError {
      /** The error domain for the error */
      errorDomain?: string;
      /** The error message for the error */
      errorMessage?: string;
    }
    interface Console {
      /** Additional urls for more information about steps */
      additionalLinks?: string[];
      /** Link to console page where violations can be resolved */
      consoleUris?: string[];
      /** Steps to resolve violation via cloud console */
      steps?: string[];
    }
    interface Customer {
      /** Container for customer onboarding steps */
      customerOnboardingState?: CustomerOnboardingState;
      /** The customer organization's display name. E.g. "google.com". */
      displayName?: string;
      /** Indicates whether a customer is fully onboarded */
      isOnboarded?: boolean;
      /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}` */
      name?: string;
    }
    interface CustomerOnboardingState {
      /** List of customer onboarding steps */
      onboardingSteps?: CustomerOnboardingStep[];
    }
    interface CustomerOnboardingStep {
      /** Output only. Current state of the step */
      completionState?: string;
      /** The completion time of the onboarding step */
      completionTime?: string;
      /** The starting time of the onboarding step */
      startTime?: string;
      /** The onboarding step */
      step?: string;
    }
    interface EkmConnection {
      /** The connection error that occurred if any */
      connectionError?: ConnectionError;
      /** Resource name of the EKM connection in the format: projects/{project}/locations/{location}/ekmConnections/{ekm_connection} */
      connectionName?: string;
      /** Output only. The connection state */
      connectionState?: string;
    }
    interface EkmConnections {
      /** The EKM connections associated with the workload */
      ekmConnections?: EkmConnection[];
      /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/ekmConnections` */
      name?: string;
    }
    interface EkmMetadata {
      /** Endpoint for sending requests to the EKM for key provisioning during Assured Workload creation. */
      ekmEndpointUri?: string;
      /** The Cloud EKM partner. */
      ekmSolution?: string;
    }
    interface Gcloud {
      /** Additional urls for more information about steps */
      additionalLinks?: string[];
      /** Gcloud command to resolve violation */
      gcloudCommands?: string[];
      /** Steps to resolve violation via gcloud cli */
      steps?: string[];
    }
    interface Instructions {
      /** Remediation instructions to resolve violation via cloud console */
      consoleInstructions?: Console;
      /** Remediation instructions to resolve violation via gcloud cli */
      gcloudInstructions?: Gcloud;
    }
    interface ListAccessApprovalRequestsResponse {
      /** List of access approval requests */
      accessApprovalRequests?: AccessApprovalRequest[];
      /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
      nextPageToken?: string;
      /** Locations that could not be reached. */
      unreachable?: string[];
    }
    interface ListCustomersResponse {
      /** List of customers */
      customers?: Customer[];
      /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
      nextPageToken?: string;
      /** Locations that could not be reached. */
      unreachable?: string[];
    }
    interface ListViolationsResponse {
      /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
      nextPageToken?: string;
      /** Workloads that could not be reached due to permission errors or any other error. Ref: https://google.aip.dev/217 */
      unreachable?: string[];
      /** List of violation */
      violations?: Violation[];
    }
    interface ListWorkloadsResponse {
      /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
      nextPageToken?: string;
      /** Locations that could not be reached. */
      unreachable?: string[];
      /** List of customer workloads */
      workloads?: Workload[];
    }
    interface OperationMetadata {
      /** Output only. API version used to start the operation. */
      apiVersion?: string;
      /** Output only. The time the operation was created. */
      createTime?: string;
      /** Output only. The time the operation finished running. */
      endTime?: string;
      /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
      requestedCancellation?: boolean;
      /** Output only. Human-readable status of the operation, if any. */
      statusMessage?: string;
      /** Output only. Server-defined resource path for the target of the operation. */
      target?: string;
      /** Output only. Name of the verb executed by the operation. */
      verb?: string;
    }
    interface Partner {
      /** Output only. Time the resource was created */
      createTime?: string;
      /** List of Google Cloud supported EKM partners supported by the partner */
      ekmSolutions?: EkmMetadata[];
      /** Identifier. The resource name of the partner. Format: `organizations/{organization}/locations/{location}/partner` Example: "organizations/123456/locations/us-central1/partner" */
      name?: string;
      /** List of Google Cloud regions that the partner sells services to customers. Valid Google Cloud regions found here: https://cloud.google.com/compute/docs/regions-zones */
      operatedCloudRegions?: string[];
      /** Google Cloud project ID in the partner's Google Cloud organization for receiving enhanced Logs for Partners. */
      partnerProjectId?: string;
      /** List of SKUs the partner is offering */
      skus?: Sku[];
      /** Output only. The last time the resource was updated */
      updateTime?: string;
    }
    interface PartnerPermissions {
      /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/partnerPermissions` */
      name?: string;
      /** The partner permissions granted for the workload */
      partnerPermissions?: string[];
    }
    interface Remediation {
      /** Values that can resolve the violation For example: for list org policy violations, this will either be the list of allowed or denied values */
      compliantValues?: string[];
      /** Required. Remediation instructions to resolve violations */
      instructions?: Instructions;
      /** Output only. Remediation type based on the type of org policy values violated */
      remediationType?: string;
    }
    interface Sku {
      /** Display name of the product identified by the SKU. A partner may want to show partner branded names for their offerings such as local sovereign cloud solutions. */
      displayName?: string;
      /** Argentum product SKU, that is associated with the partner offerings to customers used by Syntro for billing purposes. SKUs can represent resold Google products or support services. */
      id?: string;
    }
    interface Violation {
      /** Output only. Time of the event which triggered the Violation. */
      beginTime?: string;
      /** Output only. Category under which this violation is mapped. e.g. Location, Service Usage, Access, Encryption, etc. */
      category?: string;
      /** Output only. Description for the Violation. e.g. OrgPolicy gcp.resourceLocations has non compliant value. */
      description?: string;
      /** The folder_id of the violation */
      folderId?: string;
      /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/violations/{violation}` */
      name?: string;
      /** Output only. Immutable. Name of the OrgPolicy which was modified with non-compliant change and resulted this violation. Format: `projects/{project_number}/policies/{constraint_name}` `folders/{folder_id}/policies/{constraint_name}` `organizations/{organization_id}/policies/{constraint_name}` */
      nonCompliantOrgPolicy?: string;
      /** Output only. Compliance violation remediation */
      remediation?: Remediation;
      /** Output only. Time of the event which fixed the Violation. If the violation is ACTIVE this will be empty. */
      resolveTime?: string;
      /** Output only. State of the violation */
      state?: string;
      /** Output only. The last time when the Violation record was updated. */
      updateTime?: string;
    }
    interface Workload {
      /** Output only. Time the resource was created. */
      createTime?: string;
      /** Output only. The name of container folder of the assured workload */
      folder?: string;
      /** Output only. Folder id this workload is associated with */
      folderId?: string;
      /** Indicates whether a workload is fully onboarded. */
      isOnboarded?: boolean;
      /** The project id of the key management project for the workload */
      keyManagementProjectId?: string;
      /** The Google Cloud location of the workload */
      location?: string;
      /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` */
      name?: string;
      /** Partner associated with this workload. */
      partner?: string;
      /** Container for workload onboarding steps. */
      workloadOnboardingState?: WorkloadOnboardingState;
    }
    interface WorkloadOnboardingState {
      /** List of workload onboarding steps. */
      onboardingSteps?: WorkloadOnboardingStep[];
    }
    interface WorkloadOnboardingStep {
      /** Output only. The completion state of the onboarding step. */
      completionState?: string;
      /** The completion time of the onboarding step. */
      completionTime?: string;
      /** The starting time of the onboarding step. */
      startTime?: string;
      /** The onboarding step. */
      step?: string;
    }
    interface AccessApprovalRequestsResource {
      /** Lists access requests associated with a workload */
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
        /** Optional. Filtering results. */
        filter?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Optional. Hint for how to order the results. */
        orderBy?: string;
        /** Optional. The maximum number of access requests to return. The service may return fewer than this value. If unspecified, at most 500 access requests will be returned. */
        pageSize?: number;
        /** Optional. A page token, received from a previous `ListAccessApprovalRequests` call. Provide this to retrieve the subsequent page. */
        pageToken?: string;
        /** Required. Parent resource Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` */
        parent: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
      }): Request<ListAccessApprovalRequestsResponse>;
    }
    interface ViolationsResource {
      /** Gets details of a single Violation. */
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
        /** Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/violations/{violation}` */
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
      }): Request<Violation>;
      /** Lists Violations for a workload Callers may also choose to read across multiple Customers or for a single customer as per [AIP-159](https://google.aip.dev/159) by using '-' (the hyphen or dash character) as a wildcard character instead of {customer} & {workload}. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` */
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
        /** Optional. Filtering results */
        filter?: string;
        /** Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. */
        'interval.endTime'?: string;
        /** Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. */
        'interval.startTime'?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Optional. Hint for how to order the results */
        orderBy?: string;
        /** Optional. The maximum number of customers row to return. The service may return fewer than this value. If unspecified, at most 10 customers will be returned. */
        pageSize?: number;
        /** Optional. A page token, received from a previous `ListViolations` call. Provide this to retrieve the subsequent page. */
        pageToken?: string;
        /** Required. Parent resource Format `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` */
        parent: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
      }): Request<ListViolationsResponse>;
    }
    interface WorkloadsResource {
      /** Gets details of a single workload */
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
        /** Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` */
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
      }): Request<Workload>;
      /** Gets the EKM connections associated with a workload */
      getEkmConnections(request?: {
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
        /** Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/ekmConnections` */
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
      }): Request<EkmConnections>;
      /** Gets the partner permissions granted for a workload */
      getPartnerPermissions(request?: {
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
        /** Required. Name of the resource to get in the format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/partnerPermissions` */
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
      }): Request<PartnerPermissions>;
      /** Lists customer workloads for a given customer org id */
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
        /** Optional. Filtering results. */
        filter?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Optional. Hint for how to order the results. */
        orderBy?: string;
        /** The maximum number of workloads to return. The service may return fewer than this value. If unspecified, at most 500 workloads will be returned. */
        pageSize?: number;
        /** A page token, received from a previous `ListWorkloads` call. Provide this to retrieve the subsequent page. */
        pageToken?: string;
        /** Required. Parent resource Format: `organizations/{organization}/locations/{location}/customers/{customer}` */
        parent: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
      }): Request<ListWorkloadsResponse>;
      accessApprovalRequests: AccessApprovalRequestsResource;
      violations: ViolationsResource;
    }
    interface CustomersResource {
      /** Gets details of a single customer */
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
        /** Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}` */
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
      }): Request<Customer>;
      /** Lists customers of a partner identified by its Google Cloud organization ID */
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
        /** Optional. Filtering results */
        filter?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Optional. Hint for how to order the results */
        orderBy?: string;
        /** The maximum number of Customers to return. The service may return fewer than this value. If unspecified, at most 500 Customers will be returned. */
        pageSize?: number;
        /** A page token, received from a previous `ListCustomers` call. Provide this to retrieve the subsequent page. */
        pageToken?: string;
        /** Required. Parent resource Format: `organizations/{organization}/locations/{location}` */
        parent: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
      }): Request<ListCustomersResponse>;
      workloads: WorkloadsResource;
    }
    interface LocationsResource {
      /** Get details of a Partner. */
      getPartner(request?: {
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
        /** Required. Format: `organizations/{organization}/locations/{location}/partner` */
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
      }): Request<Partner>;
      customers: CustomersResource;
    }
    interface OrganizationsResource {
      locations: LocationsResource;
    }

    const organizations: OrganizationsResource;
  }
}