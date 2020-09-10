import assert from 'assert';
import {GitHelpers} from '../bin/auto-update/gitHelpers';
import {Git} from '../bin/auto-update/git';
import {Settings} from '../bin/auto-update';
import {SH} from '../bin/auto-update/sh';

const settings: Settings = {
  dtForkPath: 'dtForkPath',
  typesDirName: 'typesDirName',
  tempTypesDirName: 'tempTypesDirName',
  typesBranchName: 'typesBranchName',
  user: 'user',
  userEmail: 'userEmail',
  userName: 'userName',
  auth: 'auth',
  authBot: 'authBot',
  dtRepoOwner: 'dtRepoOwner',
  dtRepoName: 'dtRepoName',
  thisRepo: 'thisRepo',
  pullRequestTemplateSHA: 'pullRequestTemplateSHA',
  templateUpdateLabel: 'templateUpdateLabel',
};

const getGitHelpers = (tryShOutput: string) => {
  const sh = new SH(settings.dtForkPath);
  sh.trySh = () =>
    Promise.resolve({
      stdout: tryShOutput,
      pid: 0,
      output: [],
      stderr: '',
      status: null,
      signal: null,
    });
  const git = new Git(sh, settings);
  const gitHelpers = new GitHelpers(git, settings);
  return gitHelpers;
};

describe('onlyRevisionChanged', () => {
  it('returns false when not only revision changed', async () => {
    const gitHelpers = getGitHelpers(`diff --git a/types/gapi.client.calendar/index.d.ts b/types/gapi.client.calendar/index.d.ts
index 07955f963..af9776270 100644
--- a/types/gapi.client.calendar/index.d.ts
+++ b/types/gapi.client.calendar/index.d.ts
@@ -14 +14 @@
-// Revision: 20200827
+// Revision: 20200902
@@ -450 +450 @@ declare namespace gapi.client {
-            /** A gadget that extends this event. */
+            /** A gadget that extends this event. Gadgets are deprecated; this structure is instead only used for returning birthday calendar metadata. */
diff --git a/types/gapi.client.calendar/index.d.ts b/types/gapi.client.calendar/index.d.ts
index 07955f963..af9776270 100644
--- a/types/gapi.client.calendar/index.d.ts
+++ b/types/gapi.client.calendar/index.d.ts
@@ -14 +14 @@
-// Revision: 20200827
+// Revision: 20200902
`);
    assert.strictEqual(await gitHelpers.onlyRevisionChanged('type'), false);
  });

  it('returns true when only revision changed in one file', async () => {
    const gitHelpers = getGitHelpers(`diff --git a/types/gapi.client.calendar/index.d.ts b/types/gapi.client.calendar/index.d.ts
index 07955f963..af9776270 100644
--- a/types/gapi.client.calendar/index.d.ts
+++ b/types/gapi.client.calendar/index.d.ts
@@ -14 +14 @@
-// Revision: 20200827
+// Revision: 20200902
`);
    assert.strictEqual(await gitHelpers.onlyRevisionChanged('type'), true);
  });

  it('returns true when only revision changed in two files', async () => {
    const gitHelpers = getGitHelpers(`diff --git a/types/gapi.client.calendar/index.d.ts b/types/gapi.client.calendar/index.d.ts
index 07955f963..af9776270 100644
--- a/types/gapi.client.calendar/index.d.ts
+++ b/types/gapi.client.calendar/index.d.ts
@@ -14 +14 @@
-// Revision: 20200827
+// Revision: 20200902
diff --git a/types/gapi.client.calendar/index.d.ts b/types/gapi.client.calendar/index.d.ts
index 07955f963..af9776270 100644
--- a/types/gapi.client.calendar/index.d.ts
+++ b/types/gapi.client.calendar/index.d.ts
@@ -14 +14 @@
-// Revision: 20200827
+// Revision: 20200902
`);
    assert.strictEqual(await gitHelpers.onlyRevisionChanged('type'), true);
  });
});
