# TypeScript typings for Perspective Comment Analyzer API v1alpha1

The Perspective Comment Analyzer API provides information about the potential impact of a comment on a conversation (e.g. it can provide a score for the "toxicity" of a comment). Users can leverage the "SuggestCommentScore" method to submit corrections to improve Perspective over time. Users can set the "doNotStore" flag to ensure that all submitted comments are automatically deleted after scores are returned.
For detailed description please check [documentation](https://github.com/conversationai/perspectiveapi/blob/master/README.md).

## Installing

Install typings for Perspective Comment Analyzer API:

```
npm install @types/gapi.client.commentanalyzer@v1alpha1 --save-dev
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
gapi.client.load('commentanalyzer', 'v1alpha1', () => {
  // now we can use gapi.client.commentanalyzer
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // View your email address
      'https://www.googleapis.com/auth/userinfo.email',
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

After that you can use Perspective Comment Analyzer API resources:

```typescript

/*
Analyzes the provided text and returns scores for requested attributes.
*/
await gapi.client.comments.analyze({  });

/*
Suggest comment scores as training data.
*/
await gapi.client.comments.suggestscore({  });
```
