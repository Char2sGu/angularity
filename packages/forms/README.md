# @angularity/forms

Convenience abstractions for implementing custom Angular form control components.

```sh
npm i @angularity/{core,forms}
```

## Example Usage

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

## API

### `@angularity/forms`

Top-level:

- `provideComponentValueAccessor`
- `ComponentValueAccessorHost`
- `SimpleComponentValueAccessorHost`
- `ComponentValueAccessor`
