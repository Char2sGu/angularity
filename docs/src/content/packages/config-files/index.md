The `@angularity/config-files` package offers a declarative and flexible access to remote config files, such as static JSON/YAML/XML files or config REST APIs.

```sh
npm i @angularity/{core,config-files}
```

> **warning**
> It is recommended to use async theming whenever possible, since the dependent `material-design-color-utilities` package would bring 60KB of minified JavaScript to the bundle.

### Exported from `@angularity/config-files`

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
