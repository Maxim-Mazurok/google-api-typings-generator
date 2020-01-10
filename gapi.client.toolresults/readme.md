# TypeScript typings for Cloud Tool Results API v1
API to publish and access results from developer tools.
For detailed description please check [documentation](https://firebase.google.com/docs/test-lab/).

## Installing

Install typings for Cloud Tool Results API:
```
npm install @types/gapi.client.toolresults@v1 --save-dev
```

## Usage

You need to initialize Google API client in your code:
```typescript
gapi.load("client", () => { 
    // now we can use gapi.client
    // ... 
});
```

Then load api client wrapper:
```typescript
gapi.client.load('toolresults', 'v1', () => {
    // now we can use gapi.client.toolresults
    // ... 
});
```



After that you can use Cloud Tool Results API resources:

```typescript
```
