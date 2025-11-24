The `@angularity/forms` package offers convenience abstractions for implementing custom Angular form control components.

```sh
npm i @angularity/{core,forms}
```

### Example Usage

```ts
@Component({
  providers: [provideComponentValueAccessor(AglSwitch)],
})
export class AglSwitch extends SimpleComponentValueAccessorHost<boolean> {
  @HostListener('click')
  onClick(): void {
    this.valueChange$.next(!this.value());
    this.touched$.emit();
  }
}
```

### Exported from `@angularity/forms`

Top-level:

- `provideComponentValueAccessor`
  {{ JSDoc.description("packages/forms/src/index.ts#provideComponentValueAccessor") }}
- `ComponentValueAccessorHost`
  {{ JSDoc.description("packages/forms/src/index.ts#ComponentValueAccessorHost") }}
- `SimpleComponentValueAccessorHost`
  {{ JSDoc.description("packages/forms/src/index.ts#SimpleComponentValueAccessorHost") }}
- `ComponentValueAccessor`
  {{ JSDoc.description("packages/forms/src/index.ts#ComponentValueAccessor") }}
