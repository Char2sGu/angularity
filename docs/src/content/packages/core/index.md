The `@angularity/core` package exports concepts and utilities that are framework-agnostic or depends on only the the kernel part of Angular (`@angular/{core,common}`), and are depended by all the other Angularity packages.

```sh
npm i @angularity/core
```

### Exported from `@angularity/core`

Dependency Injection Utilities:

- `provide`
  {{ JSDoc.description("packages/core/src/index.ts#provide") }}
- `provideMulti`
  {{ JSDoc.description("packages/core/src/index.ts#provideMulti") }}
- `injectRef`
  {{ JSDoc.description("packages/core/src/index.ts#injectRef") }}
- `injectLazy`
  {{ JSDoc.description("packages/core/src/index.ts#injectLazy") }}

Error Handling:

- `Exception`
  {{ JSDoc.description("packages/core/src/index.ts#Exception") }}

Type Gymnastics:

- `$type`
- `TypeContainer`

Miscellaneous:

- `todo`
  {{ JSDoc.description("packages/core/src/index.ts#todo") }}

### Exported from `@angularity/core/http`

HTTP Utilities:

- `intercept`
  {{ JSDoc.description("packages/core/http/src/index.ts#intercept") }}
- `provideHttpServerCache`
  {{ JSDoc.description("packages/core/http/src/index.ts#provideHttpServerCache") }}

### Exported from `@angularity/core/rxjs`

RxJS Interoperability:

- `ObservableSignal`
  {{ JSDoc.description("packages/core/rxjs/src/index.ts#ObservableSignal") }}
- `toObservableSignal`
  {{ JSDoc.description("packages/core/rxjs/src/index.ts#toObservableSignal") }}

RxJS Operators:

- `mapToVoid`
  {{ JSDoc.description("packages/core/rxjs/src/index.ts#mapToVoid") }}
- `pickType`
  {{ JSDoc.description("packages/core/rxjs/src/index.ts#pickType") }}
