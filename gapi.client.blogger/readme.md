# TypeScript typings for Blogger API v3 v3

The Blogger API provides access to posts, comments and pages of a Blogger blog.
For detailed description please check [documentation](https://developers.google.com/blogger/docs/3.0/getting_started).

## Installing

Install typings for Blogger API v3:

```
npm install @types/gapi.client.blogger@v3 --save-dev
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
gapi.client.load('blogger', 'v3', () => {
  // now we can use gapi.client.blogger
  // ...
});
```

Don't forget to authenticate your client before sending any request to resources:

```typescript
// declare client_id registered in Google Developers Console
var client_id = '',
  scope = [ 
      // Manage your Blogger account
      'https://www.googleapis.com/auth/blogger',

      // View your Blogger account
      'https://www.googleapis.com/auth/blogger.readonly',
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

After that you can use Blogger API v3 resources:

```typescript

/*
Gets a blog by id.
*/
await gapi.client.blogger.blogs.get({ blogId: "blogId",  });

/*
Gets a blog by url.
*/
await gapi.client.blogger.blogs.getByUrl({ url: "url",  });

/*
Lists blogs by user.
*/
await gapi.client.blogger.blogs.listByUser({ userId: "userId",  });

/*
Gets one blog and user info pair by blog id and user id.
*/
await gapi.client.blogger.blogUserInfos.get({ blogId: "blogId", userId: "userId",  });

/*
Marks a comment as not spam by blog id, post id and comment id.
*/
await gapi.client.blogger.comments.approve({ blogId: "blogId", commentId: "commentId", postId: "postId",  });

/*
Deletes a comment by blog id, post id and comment id.
*/
await gapi.client.blogger.comments.delete({ blogId: "blogId", commentId: "commentId", postId: "postId",  });

/*
Gets a comment by id.
*/
await gapi.client.blogger.comments.get({ blogId: "blogId", commentId: "commentId", postId: "postId",  });

/*
Lists comments.
*/
await gapi.client.blogger.comments.list({ blogId: "blogId", postId: "postId",  });

/*
Lists comments by blog.
*/
await gapi.client.blogger.comments.listByBlog({ blogId: "blogId",  });

/*
Marks a comment as spam by blog id, post id and comment id.
*/
await gapi.client.blogger.comments.markAsSpam({ blogId: "blogId", commentId: "commentId", postId: "postId",  });

/*
Removes the content of a comment by blog id, post id and comment id.
*/
await gapi.client.blogger.comments.removeContent({ blogId: "blogId", commentId: "commentId", postId: "postId",  });

/*
Deletes a page by blog id and page id.
*/
await gapi.client.blogger.pages.delete({ blogId: "blogId", pageId: "pageId",  });

/*
Gets a page by blog id and page id.
*/
await gapi.client.blogger.pages.get({ blogId: "blogId", pageId: "pageId",  });

/*
Inserts a page.
*/
await gapi.client.blogger.pages.insert({ blogId: "blogId",  });

/*
Lists pages.
*/
await gapi.client.blogger.pages.list({ blogId: "blogId",  });

/*
Patches a page.
*/
await gapi.client.blogger.pages.patch({ blogId: "blogId", pageId: "pageId",  });

/*
Publishes a page.
*/
await gapi.client.blogger.pages.publish({ blogId: "blogId", pageId: "pageId",  });

/*
Reverts a published or scheduled page to draft state.
*/
await gapi.client.blogger.pages.revert({ blogId: "blogId", pageId: "pageId",  });

/*
Updates a page by blog id and page id.
*/
await gapi.client.blogger.pages.update({ blogId: "blogId", pageId: "pageId",  });

/*
Gets page views by blog id.
*/
await gapi.client.blogger.pageViews.get({ blogId: "blogId",  });

/*
Deletes a post by blog id and post id.
*/
await gapi.client.blogger.posts.delete({ blogId: "blogId", postId: "postId",  });

/*
Gets a post by blog id and post id
*/
await gapi.client.blogger.posts.get({ blogId: "blogId", postId: "postId",  });

/*
Gets a post by path.
*/
await gapi.client.blogger.posts.getByPath({ blogId: "blogId", path: "path",  });

/*
Inserts a post.
*/
await gapi.client.blogger.posts.insert({ blogId: "blogId",  });

/*
Lists posts.
*/
await gapi.client.blogger.posts.list({ blogId: "blogId",  });

/*
Patches a post.
*/
await gapi.client.blogger.posts.patch({ blogId: "blogId", postId: "postId",  });

/*
Publishes a post.
*/
await gapi.client.blogger.posts.publish({ blogId: "blogId", postId: "postId",  });

/*
Reverts a published or scheduled post to draft state.
*/
await gapi.client.blogger.posts.revert({ blogId: "blogId", postId: "postId",  });

/*
Searches for posts matching given query terms in the specified blog.
*/
await gapi.client.blogger.posts.search({ blogId: "blogId", q: "q",  });

/*
Updates a post by blog id and post id.
*/
await gapi.client.blogger.posts.update({ blogId: "blogId", postId: "postId",  });

/*
Gets one post and user info pair, by post_id and user_id.
*/
await gapi.client.blogger.postUserInfos.get({ blogId: "blogId", postId: "postId", userId: "userId",  });

/*
Lists post and user info pairs.
*/
await gapi.client.blogger.postUserInfos.list({ blogId: "blogId", userId: "userId",  });

/*
Gets one user by user_id.
*/
await gapi.client.blogger.users.get({ userId: "userId",  });
```
