# TypeScript typings for Security Command Center API v1beta2

Security Command Center API provides access to temporal views of assets and findings within an organization.
For detailed description please check [documentation](https://cloud.google.com/security-command-center).

## Installing

Install typings for Security Command Center API:

```
npm install @types/gapi.client.securitycenter-v1beta2 --save-dev
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
gapi.client.load('https://securitycenter.googleapis.com/$discovery/rest?version=v1beta2', () => {
  // now we can use:
  // gapi.client.securitycenter
});
```

```typescript
// Deprecated, use discovery document URL, see https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientloadname----version----callback--
gapi.client.load('securitycenter', 'v1beta2', () => {
  // now we can use:
  // gapi.client.securitycenter
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [
      // See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account.
      'https://www.googleapis.com/auth/cloud-platform',
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

After that you can use Security Command Center API resources: <!-- TODO: make this work for multiple namespaces -->

```typescript

/*
Get the ContainerThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.folders.getContainerThreatDetectionSettings({ name: "name",  });

/*
Get the EventThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.folders.getEventThreatDetectionSettings({ name: "name",  });

/*
Retrieve the OnboardingState of a resource.
*/
await gapi.client.securitycenter.folders.getOnboardingState({ name: "name",  });

/*
Get the RapidVulnerabilityDetectionSettings resource.
*/
await gapi.client.securitycenter.folders.getRapidVulnerabilityDetectionSettings({ name: "name",  });

/*
Get the SecurityCenterSettings resource.
*/
await gapi.client.securitycenter.folders.getSecurityCenterSettings({ name: "name",  });

/*
Get the SecurityHealthAnalyticsSettings resource.
*/
await gapi.client.securitycenter.folders.getSecurityHealthAnalyticsSettings({ name: "name",  });

/*
Get the VirtualMachineThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.folders.getVirtualMachineThreatDetectionSettings({ name: "name",  });

/*
Get the WebSecurityScannerSettings resource.
*/
await gapi.client.securitycenter.folders.getWebSecurityScannerSettings({ name: "name",  });

/*
Update the ContainerThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.folders.updateContainerThreatDetectionSettings({ name: "name",  });

/*
Update the EventThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.folders.updateEventThreatDetectionSettings({ name: "name",  });

/*
Update the RapidVulnerabilityDetectionSettings resource.
*/
await gapi.client.securitycenter.folders.updateRapidVulnerabilityDetectionSettings({ name: "name",  });

/*
Update the SecurityHealthAnalyticsSettings resource.
*/
await gapi.client.securitycenter.folders.updateSecurityHealthAnalyticsSettings({ name: "name",  });

/*
Update the VirtualMachineThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.folders.updateVirtualMachineThreatDetectionSettings({ name: "name",  });

/*
Update the WebSecurityScannerSettings resource.
*/
await gapi.client.securitycenter.folders.updateWebSecurityScannerSettings({ name: "name",  });

/*
Get the ContainerThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.organizations.getContainerThreatDetectionSettings({ name: "name",  });

/*
Get the EventThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.organizations.getEventThreatDetectionSettings({ name: "name",  });

/*
Retrieve the OnboardingState of a resource.
*/
await gapi.client.securitycenter.organizations.getOnboardingState({ name: "name",  });

/*
Get the RapidVulnerabilityDetectionSettings resource.
*/
await gapi.client.securitycenter.organizations.getRapidVulnerabilityDetectionSettings({ name: "name",  });

/*
Get the SecurityCenterSettings resource.
*/
await gapi.client.securitycenter.organizations.getSecurityCenterSettings({ name: "name",  });

/*
Get the SecurityHealthAnalyticsSettings resource.
*/
await gapi.client.securitycenter.organizations.getSecurityHealthAnalyticsSettings({ name: "name",  });

/*
Get the Subscription resource.
*/
await gapi.client.securitycenter.organizations.getSubscription({ name: "name",  });

/*
Get the VirtualMachineThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.organizations.getVirtualMachineThreatDetectionSettings({ name: "name",  });

/*
Get the WebSecurityScannerSettings resource.
*/
await gapi.client.securitycenter.organizations.getWebSecurityScannerSettings({ name: "name",  });

/*
Update the ContainerThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.organizations.updateContainerThreatDetectionSettings({ name: "name",  });

/*
Update the EventThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.organizations.updateEventThreatDetectionSettings({ name: "name",  });

/*
Update the RapidVulnerabilityDetectionSettings resource.
*/
await gapi.client.securitycenter.organizations.updateRapidVulnerabilityDetectionSettings({ name: "name",  });

/*
Update the SecurityHealthAnalyticsSettings resource.
*/
await gapi.client.securitycenter.organizations.updateSecurityHealthAnalyticsSettings({ name: "name",  });

/*
Update the VirtualMachineThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.organizations.updateVirtualMachineThreatDetectionSettings({ name: "name",  });

/*
Update the WebSecurityScannerSettings resource.
*/
await gapi.client.securitycenter.organizations.updateWebSecurityScannerSettings({ name: "name",  });

/*
Get the ContainerThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.projects.getContainerThreatDetectionSettings({ name: "name",  });

/*
Get the EventThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.projects.getEventThreatDetectionSettings({ name: "name",  });

/*
Retrieve the OnboardingState of a resource.
*/
await gapi.client.securitycenter.projects.getOnboardingState({ name: "name",  });

/*
Get the RapidVulnerabilityDetectionSettings resource.
*/
await gapi.client.securitycenter.projects.getRapidVulnerabilityDetectionSettings({ name: "name",  });

/*
Get the SecurityCenterSettings resource.
*/
await gapi.client.securitycenter.projects.getSecurityCenterSettings({ name: "name",  });

/*
Get the SecurityHealthAnalyticsSettings resource.
*/
await gapi.client.securitycenter.projects.getSecurityHealthAnalyticsSettings({ name: "name",  });

/*
Get the VirtualMachineThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.projects.getVirtualMachineThreatDetectionSettings({ name: "name",  });

/*
Get the WebSecurityScannerSettings resource.
*/
await gapi.client.securitycenter.projects.getWebSecurityScannerSettings({ name: "name",  });

/*
Update the ContainerThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.projects.updateContainerThreatDetectionSettings({ name: "name",  });

/*
Update the EventThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.projects.updateEventThreatDetectionSettings({ name: "name",  });

/*
Update the RapidVulnerabilityDetectionSettings resource.
*/
await gapi.client.securitycenter.projects.updateRapidVulnerabilityDetectionSettings({ name: "name",  });

/*
Update the SecurityHealthAnalyticsSettings resource.
*/
await gapi.client.securitycenter.projects.updateSecurityHealthAnalyticsSettings({ name: "name",  });

/*
Update the VirtualMachineThreatDetectionSettings resource.
*/
await gapi.client.securitycenter.projects.updateVirtualMachineThreatDetectionSettings({ name: "name",  });

/*
Update the WebSecurityScannerSettings resource.
*/
await gapi.client.securitycenter.projects.updateWebSecurityScannerSettings({ name: "name",  });
```
