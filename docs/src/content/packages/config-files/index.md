The `@angularity/config-files` package offers a declarative and flexible access to remote config files, such as static JSON/YAML/XML files or config REST APIs.

```sh
npm i @angularity/{core,config-files}
```

> **warning**
> It is recommended to use async theming whenever possible, since the dependent `material-design-color-utilities` package would bring 60KB of minified JavaScript to the bundle.

## Signature Symbols

The following symbols are the signature symbols of the `@angularity/config-files` package.
Click on the symbol to see the detailed documentation.

> **note**
> All Angularity symbols are well-documented with JSDoc.

### Exported from `@angularity/config-files`

Top-level:

- `defineConfigFile`
  {{ JSDoc.description("packages/config-files/src/public-api.ts#defineConfigFile") }}
- `useConfigFile`
  {{ JSDoc.description("packages/config-files/src/public-api.ts#useConfigFile") }}

Services:

- `ConfigFileLoader`
  {{ JSDoc.description("packages/config-files/src/public-api.ts#ConfigFileLoader") }}
- `ConfigFileParser`
  {{ JSDoc.description("packages/config-files/src/public-api.ts#ConfigFileParser") }}
- `ConfigFileValidator`
  {{ JSDoc.description("packages/config-files/src/public-api.ts#ConfigFileValidator") }}

Implementations:

- `TextParser`
  {{ JSDoc.description("packages/config-files/src/public-api.ts#TextParser") }}
- `JsonParser`
  {{ JSDoc.description("packages/config-files/src/public-api.ts#JsonParser") }}
- `NoopValidator`
  {{ JSDoc.description("packages/config-files/src/public-api.ts#NoopValidator") }}

Caching:

- `CacheConfigFiles`
  {{ JSDoc.description("packages/config-files/src/public-api.ts#CacheConfigFiles") }}
- `httpServerCacheConfigFilesInterceptor`
  {{ JSDoc.description("packages/config-files/src/public-api.ts#httpServerCacheConfigFilesInterceptor") }}
