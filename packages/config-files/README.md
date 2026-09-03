# @angularity/config-files

Declarative and flexible access to remote config files — static JSON/YAML/XML files or config REST APIs.

```sh
npm i @angularity/{core,config-files}
```

## API

### `@angularity/config-files`

Top-level:

- `defineConfigFile`
- `useConfigFile`

Services:

- `ConfigFileLoader`
- `ConfigFileParser`
- `ConfigFileValidator`

Implementations:

- `TextParser`
- `JsonParser`
- `NoopValidator`

Caching:

- `CacheConfigFiles`
- `httpServerCacheConfigFilesInterceptor`
