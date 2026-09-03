# @angularity/cdk

Component development primitives built on top of `@angular/cdk`.

```sh
npm i @angular/cdk @angularity/{core,cdk}
```

The package is split by concern into several entry points:

- `@angularity/cdk` — view-transition primitives.
- `@angularity/cdk/dialog` — dialog enhancements over the CDK dialog.
- `@angularity/cdk/portal` — animation-aware portal factories.
- `@angularity/cdk/layout` — named breakpoint and color-scheme observers.

## API

### `@angularity/cdk`

View Transition:

- `HostTransition`

### `@angularity/cdk/dialog`

Dialog Enhancements:

- `useDialog`
- `DialogIoTypes`
- `AnimationAwareDialog`

### `@angularity/cdk/portal`

Portal Enhancements:

- `createAnimationAwareTemplatePortal`
- `createAnimationAwareComponentPortal`

### `@angularity/cdk/layout`

Layout Enhancements:

- `NamedBreakpointObserver`
- `SystemColorSchemeObserver`
