In Angular CDK, the `BreakpointObserver` is especially useful for observing changes in the layout. However, it uses the media query string as the key to index the result of multiple queries, which makes it inconvenient for the developer to tell which breakpoints are activated.

Angularity offers `NamedBreakpointObserver` as a wrapper of `BreakpointObserver`, which allows you to assign a name for each media query:

```ts
const observer = inject(NamedBreakpointObserver);
observer
  .observe({
    compact: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width: 839px)',
    extended: '(min-width: 840px)',
  })
  .subscribe((map) => {
    // Record<'compact' | 'medium' | 'extended', boolean>
  });
```
