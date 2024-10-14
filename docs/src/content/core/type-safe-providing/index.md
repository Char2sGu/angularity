In Angular, object literals are used to declare injectables of an injection context:

```ts
providers: [
  {
    provide: TitleStrategy,
    useClass: SuffixedTitleStrategy,
  },
  {
    provide: DIALOG_GLOBAL_CONFIG,
    useValue: { closable: false } satisfies DialogGlobalConfig,
  },
  {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: () => () => console.log('Initialized'),
  },
];
```

However, although the `ProviderToken` already carries type information, the object literals cannot perform type checks to ensure type-safety, requiring the developer to manually make sure that the provided value is valid.

In the snippet above, the developer:

1. Must make sure `SuffixedTitleStrategy` correctly implements `TitleStrategy`.
1. Must use the `satisfies` keyword to manually restrict the type of the provider of `DIALOG_GLOBAL_CONFIG`.
1. Cannot appropriately type the `APP_INITIALIZER` since there is no such `AppInitializer` type exported.

As a solution, Angularity offers `provide` and `provideMulti` as helper functions for type-safe provider declarations:

```ts
providers: [
  provide({
    token: TitleStrategy,
    useClass: SuffixedTitleStrategy,
  }),
  provide({
    token: DIALOG_GLOBAL_CONFIG,
    useValue: { closable: false },
  }),
  provideMulti({
    token: APP_INITIALIZER,
    useFactory: () => () => console.log('Initialized'),
  }),
];
```

In the example above, all the providers' types are automatically inferred and restricted from the token. By elevating the `multi` option to the function name, it also helps prevent the developer from forgetting the `multi` option.
