/* Type definitions for non-npm package Campaign Manager 360 API v3.5 0.0 */
// Project: https://developers.google.com/doubleclick-advertisers/
// Definitions by: Maxim Mazurok <https://github.com/Maxim-Mazurok>
//                 Nick Amoscato <https://github.com/namoscato>
//                 Declan Vong <https://github.com/declanvong>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// IMPORTANT
// This file was generated by https://github.com/Maxim-Mazurok/google-api-typings-generator. Please do not edit it manually.
// In case of any problems please post issue to https://github.com/Maxim-Mazurok/google-api-typings-generator
// Generated from: https://dfareporting.googleapis.com/$discovery/rest?version=v3.5
// Revision: 20240613

/// <reference types="gapi.client" />

declare namespace gapi.client {
  /** Load Campaign Manager 360 API v3.5 */
  function load(
    urlOrObject: 'https://dfareporting.googleapis.com/$discovery/rest?version=v3.5'
  ): Promise<void>;
  /** @deprecated Please load APIs with discovery documents. */
  function load(name: 'dfareporting', version: 'v3.5'): Promise<void>;
  /** @deprecated Please load APIs with discovery documents. */
  function load(
    name: 'dfareporting',
    version: 'v3.5',
    callback: () => any
  ): void;

  namespace dfareporting {
    interface ClickTag {
      /** Parameter value for the specified click tag. This field contains a click-through url. */
      clickThroughUrl?: CreativeClickThroughUrl;
      /** Advertiser event name associated with the click tag. This field is used by DISPLAY_IMAGE_GALLERY and HTML5_BANNER creatives. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
      eventName?: string;
      /** Parameter name for the specified click tag. For DISPLAY_IMAGE_GALLERY creative assets, this field must match the value of the creative asset's creativeAssetId.name field. */
      name?: string;
    }
    interface CreativeAssetId {
      /** Name of the creative asset. This is a required field while inserting an asset. After insertion, this assetIdentifier is used to identify the uploaded asset. Characters in the name must be alphanumeric or one of the following: ".-_ ". Spaces are allowed. */
      name?: string;
      /** Type of asset to upload. This is a required field. FLASH and IMAGE are no longer supported for new uploads. All image assets should use HTML_IMAGE. */
      type?: string;
    }
    interface CreativeAssetMetadata {
      /** ID of the creative asset. This is a required field. */
      assetIdentifier?: CreativeAssetId;
      /** List of detected click tags for assets. This is a read-only, auto-generated field. This field is empty for a rich media asset. */
      clickTags?: ClickTag[];
      /** List of counter events configured for the asset. This is a read-only, auto-generated field and only applicable to a rich media asset. */
      counterCustomEvents?: CreativeCustomEvent[];
      /** List of feature dependencies for the creative asset that are detected by Campaign Manager. Feature dependencies are features that a browser must be able to support in order to render your HTML5 creative correctly. This is a read-only, auto-generated field. */
      detectedFeatures?: string[];
      /** List of exit events configured for the asset. This is a read-only, auto-generated field and only applicable to a rich media asset. */
      exitCustomEvents?: CreativeCustomEvent[];
      /** Numeric ID of the asset. This is a read-only, auto-generated field. */
      id?: string;
      /** Dimension value for the numeric ID of the asset. This is a read-only, auto-generated field. */
      idDimensionValue?: DimensionValue;
      /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#creativeAssetMetadata". */
      kind?: string;
      mediaRequestInfo?: MediaRequestInfo;
      mediaResponseInfo?: MediaResponseInfo;
      /** True if the uploaded asset is a rich media asset. This is a read-only, auto-generated field. */
      richMedia?: boolean;
      /** List of timer events configured for the asset. This is a read-only, auto-generated field and only applicable to a rich media asset. */
      timerCustomEvents?: CreativeCustomEvent[];
      /** Rules validated during code generation that generated a warning. This is a read-only, auto-generated field. Possible values are: - "ADMOB_REFERENCED" - "ASSET_FORMAT_UNSUPPORTED_DCM" - "ASSET_INVALID" - "CLICK_TAG_HARD_CODED" - "CLICK_TAG_INVALID" - "CLICK_TAG_IN_GWD" - "CLICK_TAG_MISSING" - "CLICK_TAG_MORE_THAN_ONE" - "CLICK_TAG_NON_TOP_LEVEL" - "COMPONENT_UNSUPPORTED_DCM" - "ENABLER_UNSUPPORTED_METHOD_DCM" - "EXTERNAL_FILE_REFERENCED" - "FILE_DETAIL_EMPTY" - "FILE_TYPE_INVALID" - "GWD_PROPERTIES_INVALID" - "HTML5_FEATURE_UNSUPPORTED" - "LINKED_FILE_NOT_FOUND" - "MAX_FLASH_VERSION_11" - "MRAID_REFERENCED" - "NOT_SSL_COMPLIANT" - "ORPHANED_ASSET" - "PRIMARY_HTML_MISSING" - "SVG_INVALID" - "ZIP_INVALID" */
      warnedValidationRules?: string[];
    }
    interface CreativeClickThroughUrl {
      /** Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field. */
      computedClickThroughUrl?: string;
      /** Custom click-through URL. Applicable if the landingPageId field is left unset. */
      customClickThroughUrl?: string;
      /** ID of the landing page for the click-through URL. */
      landingPageId?: string;
    }
    interface CreativeCustomEvent {
      /** Unique ID of this event used by Reporting and Data Transfer. This is a read-only field. */
      advertiserCustomEventId?: string;
      /** User-entered name for the event. */
      advertiserCustomEventName?: string;
      /** Type of the event. This is a read-only field. */
      advertiserCustomEventType?: string;
      /** Artwork label column, used to link events in Campaign Manager back to events in Studio. This is a required field and should not be modified after insertion. */
      artworkLabel?: string;
      /** Artwork type used by the creative.This is a read-only field. */
      artworkType?: string;
      /** Exit click-through URL for the event. This field is used only for exit events. */
      exitClickThroughUrl?: CreativeClickThroughUrl;
      /** ID of this event. This is a required field and should not be modified after insertion. */
      id?: string;
      /** Properties for rich media popup windows. This field is used only for exit events. */
      popupWindowProperties?: PopupWindowProperties;
      /** Target type used by the event. */
      targetType?: string;
      /** Video reporting ID, used to differentiate multiple videos in a single creative. This is a read-only field. */
      videoReportingId?: string;
    }
    interface DimensionValue {
      /** The name of the dimension. */
      dimensionName?: string;
      /** The eTag of this response for caching purposes. */
      etag?: string;
      /** The ID associated with the value if available. */
      id?: string;
      /** The kind of resource this is, in this case dfareporting#dimensionValue. */
      kind?: string;
      /** Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT. */
      matchType?: string;
      /** The value of the dimension. */
      value?: string;
    }
    interface MediaRequestInfo {
      /** The number of current bytes uploaded or downloaded. */
      currentBytes?: string;
      /** Data to be copied to backend requests. Custom data is returned to Scotty in the agent_state field, which Scotty will then provide in subsequent upload notifications. */
      customData?: string;
      /** Set if the http request info is diff encoded. The value of this field is the version number of the base revision. This is corresponding to Apiary's mediaDiffObjectVersion (//depot/google3/java/com/google/api/server/media/variable/DiffObjectVersionVariable.java). See go/esf-scotty-diff-upload for more information. */
      diffObjectVersion?: string;
      /** The existence of the final_status field indicates that this is the last call to the agent for this request_id. http://google3/uploader/agent/scotty_agent.proto?l=737&rcl=347601929 */
      finalStatus?: number;
      /** The type of notification received from Scotty. */
      notificationType?: string;
      /** The Scotty request ID. */
      requestId?: string;
      /** The partition of the Scotty server handling this request. type is uploader_service.RequestReceivedParamsServingInfo LINT.IfChange(request_received_params_serving_info_annotations) LINT.ThenChange() */
      requestReceivedParamsServingInfo?: string;
      /** The total size of the file. */
      totalBytes?: string;
      /** Whether the total bytes field contains an estimated data. */
      totalBytesIsEstimated?: boolean;
    }
    interface MediaResponseInfo {
      /** Data to copy from backend response to the next backend requests. Custom data is returned to Scotty in the agent_state field, which Scotty will then provide in subsequent upload notifications. */
      customData?: string;
      /** Specifies any transformation to be applied to data before persisting it or retrieving from storage. E.g., encryption options for blobstore2. This should be of the form uploader_service.DataStorageTransform. */
      dataStorageTransform?: string;
      /** Specifies the Scotty Drop Target to use for uploads. If present in a media response, Scotty does not upload to a standard drop zone. Instead, Scotty saves the upload directly to the location specified in this drop target. Unlike drop zones, the drop target is the final storage location for an upload. So, the agent does not need to clone the blob at the end of the upload. The agent is responsible for garbage collecting any orphaned blobs that may occur due to aborted uploads. For more information, see the drop target design doc here: http://goto/ScottyDropTarget This field will be preferred to dynamicDropzone. If provided, the identified field in the response must be of the type uploader.agent.DropTarget. */
      dynamicDropTarget?: string;
      /** Specifies the Scotty dropzone to use for uploads. */
      dynamicDropzone?: string;
      /** Request class to use for all Blobstore operations for this request. */
      requestClass?: string;
      /** Requester ID passed along to be recorded in the Scotty logs */
      scottyAgentUserId?: string;
      /** Customer-specific data to be recorded in the Scotty logs type is logs_proto_scotty.CustomerLog */
      scottyCustomerLog?: string;
      /** Specifies the TrafficClass that Scotty should use for any RPCs to fetch the response bytes. Will override the traffic class GTOS of the incoming http request. This is a temporary field to facilitate whitelisting and experimentation by the bigstore agent only. For instance, this does not apply to RTMP reads. WARNING: DO NOT USE WITHOUT PERMISSION FROM THE SCOTTY TEAM. */
      trafficClassField?: string;
      /** Tells Scotty to verify hashes on the agent's behalf by parsing out the X-Goog-Hash header. */
      verifyHashFromHeader?: boolean;
    }
    interface OffsetPosition {
      /** Offset distance from left side of an asset or a window. */
      left?: number;
      /** Offset distance from top side of an asset or a window. */
      top?: number;
    }
    interface PopupWindowProperties {
      /** Popup dimension for a creative. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA and all VPAID */
      dimension?: Size;
      /** Upper-left corner coordinates of the popup window. Applicable if positionType is COORDINATES. */
      offset?: OffsetPosition;
      /** Popup window position either centered or at specific coordinate. */
      positionType?: string;
      /** Whether to display the browser address bar. */
      showAddressBar?: boolean;
      /** Whether to display the browser menu bar. */
      showMenuBar?: boolean;
      /** Whether to display the browser scroll bar. */
      showScrollBar?: boolean;
      /** Whether to display the browser status bar. */
      showStatusBar?: boolean;
      /** Whether to display the browser tool bar. */
      showToolBar?: boolean;
      /** Title of popup window. */
      title?: string;
    }
    interface Size {
      /** Height of this size. Acceptable values are 0 to 32767, inclusive. */
      height?: number;
      /** IAB standard size. This is a read-only, auto-generated field. */
      iab?: boolean;
      /** ID of this size. This is a read-only, auto-generated field. */
      id?: string;
      /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#size". */
      kind?: string;
      /** Width of this size. Acceptable values are 0 to 32767, inclusive. */
      width?: number;
    }
    interface MediaResource {
      /** Inserts a new creative asset. */
      upload(request: {
        /** V1 error format. */
        '$.xgafv'?: string;
        /** OAuth access token. */
        access_token?: string;
        /** Advertiser ID of this creative. This is a required field. */
        advertiserId: string;
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
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** User profile ID associated with this request. */
        profileId: string;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** Request body */
        resource: CreativeAssetMetadata;
      }): Request<CreativeAssetMetadata>;
      upload(
        request: {
          /** V1 error format. */
          '$.xgafv'?: string;
          /** OAuth access token. */
          access_token?: string;
          /** Advertiser ID of this creative. This is a required field. */
          advertiserId: string;
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
          /** Returns response with indentations and line breaks. */
          prettyPrint?: boolean;
          /** User profile ID associated with this request. */
          profileId: string;
          /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
          quotaUser?: string;
          /** Upload protocol for media (e.g. "raw", "multipart"). */
          upload_protocol?: string;
          /** Legacy upload protocol for media (e.g. "media", "multipart"). */
          uploadType?: string;
        },
        body: CreativeAssetMetadata
      ): Request<CreativeAssetMetadata>;
    }

    const media: MediaResource;
  }
}