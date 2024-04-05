# {{ NgDocPage.title }}

In Angular, object literals are used to declare injectables of the injection context:

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

However, although the `ProviderToken` already carries type information, the object literal does not perform type checks to ensure type-safety, requiring the developer to manually perform type restrictions.

In the snippet above, the developer must make sure that `SuffixedTitleStrategy` correctly implements `TitleStrategy`, and use a `satisfies` statement to manually restrict the type of the dialog global config.

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

By elevating the `multi` option to the function name, it also helps prevent the developer from forgetting the `multi` option.
