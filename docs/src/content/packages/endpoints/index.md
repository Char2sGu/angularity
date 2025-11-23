The `@angularity/endpoints` package offers a declarative access to HTTP endpoints with swappable implementations.

```sh
npm i @angularity/{core,endpoints}
```

### Exported from `@angularity/endpoints`

Top-level:

- `generateEndpoint`
  {{ JSDoc.description("packages/endpoints/src/public-api.ts#generateEndpoint") }}
- `generateEndpoints`
  {{ JSDoc.description("packages/endpoints/src/public-api.ts#generateEndpoints") }}
- `useEndpoints`
  {{ JSDoc.description("packages/endpoints/src/public-api.ts#useEndpoints") }}

Services:

- `EndpointInvoker`
  {{ JSDoc.description("packages/endpoints/src/public-api.ts#EndpointInvoker") }}
- `HttpClientEndpointInvoker`
  {{ JSDoc.description("packages/endpoints/src/public-api.ts#HttpClientEndpointInvoker") }}

Behaviors:

- `PrefixEndpointPath`
  {{ JSDoc.description("packages/endpoints/src/public-api.ts#PrefixEndpointPath") }}
- `CacheEndpointResponse`
  {{ JSDoc.description("packages/endpoints/src/public-api.ts#CacheEndpointResponse") }}
