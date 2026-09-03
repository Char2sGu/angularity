<!-- Generated from the package README by scripts/generate-docs.mjs. Do not edit. -->

Declarative and flexible access to remote config files — static JSON/YAML/XML files or config REST APIs.

```sh
npm i @angularity/{core,config-files}
```

### `@angularity/config-files`

Top-level:

- `defineConfigFile`
  {{ JSDoc.description("packages/config-files/src/index.ts#defineConfigFile") }}
- `useConfigFile`
  {{ JSDoc.description("packages/config-files/src/index.ts#useConfigFile") }}

Services:

- `ConfigFileLoader`
  {{ JSDoc.description("packages/config-files/src/index.ts#ConfigFileLoader") }}
- `ConfigFileParser`
  {{ JSDoc.description("packages/config-files/src/index.ts#ConfigFileParser") }}
- `ConfigFileValidator`
  {{ JSDoc.description("packages/config-files/src/index.ts#ConfigFileValidator") }}

Implementations:

- `TextParser`
  {{ JSDoc.description("packages/config-files/src/index.ts#TextParser") }}
- `JsonParser`
  {{ JSDoc.description("packages/config-files/src/index.ts#JsonParser") }}
- `NoopValidator`
  {{ JSDoc.description("packages/config-files/src/index.ts#NoopValidator") }}

Caching:

- `CacheConfigFiles`
  {{ JSDoc.description("packages/config-files/src/index.ts#CacheConfigFiles") }}
- `httpServerCacheConfigFilesInterceptor`
  {{ JSDoc.description("packages/config-files/src/index.ts#httpServerCacheConfigFilesInterceptor") }}
