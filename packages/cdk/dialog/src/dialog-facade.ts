import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import {
  ComponentFactoryResolver,
  DestroyRef,
  inject,
  Injector,
  Signal,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, merge, of, Subject, switchMap } from 'rxjs';

const TYPES = Symbol('TYPES');

/**
 * Base class for any dialog component classes to declare their input and
 * output types and work with the other utility types and the `useDialog`
 * function.
 *
 * @example
 *  ```ts
 *  class MyDialog extends DialogIoTypes<{ data: string }, { success: boolean }> {}
 *  ```
 *
 * @example
 *  ```ts
 *  class MyDialog extends DialogIoTypes<string, boolean> {}
 *  ```
 *
 * @see `useDialog`
 * @see `DialogConfigOf`
 * @see `DialogRefOf`
 * @see `DialogInputOf`
 * @see `DialogOutputOf`
 */
export abstract class DialogIoTypes<Input, Output> {
  [TYPES]?: [Input, Output];
}

/**
 * Utility type to extract the input type from a dialog component type that
 * extends `DialogIoTypes`.
 *
 * @example
 *  ```ts
 *  const input: DialogInputOf<MyDialog> = { ... };
 *  ```
 *
 * @see `DialogIoTypes`
 */
export type DialogInputOf<T extends DialogIoTypes<any, any>> =
  T extends DialogIoTypes<infer Input, any> ? Input : never;

/**
 * Utility type to extract the output type from a dialog component type that
 * extends `DialogIoTypes`.
 *
 * @example
 *  ```ts
 *  function handleOutput(output: DialogOutputOf<MyDialog>) { ... }
 *  ```
 *
 * @see `DialogIoTypes`
 */
export type DialogOutputOf<T extends DialogIoTypes<any, any>> =
  T extends DialogIoTypes<any, infer Output> ? Output : never;

/**
 * Utility type to extract a strictly typed `DialogRef` type from a dialog
 * component type that extends `DialogIoTypes`.
 *
 * @example
 *  ```ts
 *  function handleRef(ref: DialogRefOf<MyDialog>) { ... }
 *  ```
 *
 * @see `DialogIoTypes`
 */
export type DialogRefOf<T extends DialogIoTypes<any, any>> = DialogRef<
  DialogOutputOf<T>,
  T
>;

/**
 * Extracts a strictly typed `DialogConfig` type from a dialog component type
 * that extends `DialogIoTypes`.
 *
 * @example
 *  ```ts
 *  const config: DialogConfigOf<MyDialog> = { ... };
 *  ```
 *
 * @see `DialogIoTypes`
 */
export type DialogConfigOf<T extends DialogIoTypes<any, any>> = DialogConfig<
  DialogInputOf<T>,
  DialogRefOf<T>
>;

/**
 * A facade interface useful for reactively interacting with a specific type
 * of dialog within components, created by `useDialog`.
 * @see `useDialog`
 */
export interface DialogFacade<T extends DialogIoTypes<any, any>> {
  /**
   * Launch the dialog with configuration overrides
   * @param config configuration that will be shallow-merged with the default one.
   * @returns a strictly typed `DialogRef` object
   */
  launch(config?: DialogConfigOf<T>): DialogRefOf<T>;

  /**
   * Signal containing a `DialogRef` if the dialog is launched and not
   * disposed, or `undefined` otherwise.
   */
  readonly ref: Signal<DialogRefOf<T> | undefined>;
}

/**
 * Assembles a facade object for a specific dialog component type with optional
 * default configurations, enabling a satisfying development experience working with
 * Angular CDK dialogs.
 *
 * @param component dialog component class, extending `DialogIoTypes`
 * @param configDefaults default configuration for the dialog
 * @returns a `DialogFacade` object for the specified dialog component
 *
 * @example
 *  ```ts
 *  // Declare dialog input and output types on the dialog class.
 *  \@Component({ ... })
 *  class MyDialog extends DialogIoTypes<
 *    { someData: object }, // Input type
 *    { someResult: object } // Output type
 *  > {}
 * ```
 * ```ts
 *  \@Component({ ... })
 *  class HostComponent {
 *    private myDialog = useDialog(MyDialog, { disableClose: true });
 *
 *    onFoo(): void {
 *      // Typed dialog launching experience.
 *      const ref = this.myDialog.launch({ data: { inputs: "values" } });
 *      // Typed dialog output
 *      ref.closed.subscribe((output) => { ... });
 *    }
 *
 *    onBar(): void {
 *      // Access the current DialogRef anytime.
 *      this.myDialog.ref()?.close();
 *    }
 *
 *    constructor() {
 *      effect(() => {
 *        const ref = this.myDialog.ref();
 *        // Listen to the dialog launching and closing
 *        if (ref) console.log("Dialog launched");
 *        else console.log("Dialog closed or never launched");
 *      });
 *    }
 *  }
 * ```
 */
export function useDialog<T extends DialogIoTypes<any, any>>(
  component: Type<T>,
  configDefaults: Partial<DialogConfigOf<T>> = {},
  [
    service,
    injector,
    destroyRef,
    componentFactoryResolver,
    viewContainerRef,
  ] = [
    inject(Dialog),
    inject(Injector),
    inject(DestroyRef),
    inject(ComponentFactoryResolver),
    inject(ViewContainerRef, { optional: true }) ?? undefined, // available only in components
  ],
): DialogFacade<T> {
  const launched$ = new Subject<DialogRefOf<T>>();
  destroyRef.onDestroy(() => launched$.complete());
  return {
    launch: (config: DialogConfigOf<T> = {}): DialogRefOf<T> => {
      const open = service.open.bind(service);
      const ref = open(component, {
        injector, // supplies parent component providers and view providers
        viewContainerRef, // logical location of the created component
        componentFactoryResolver, // supplies the correct environment injector with environmental providers
        ...configDefaults,
        ...config,
      });
      launched$.next(ref);
      return ref;
    },
    ref: toSignal(
      launched$.pipe(
        switchMap((ref) =>
          merge(of(ref), ref.closed.pipe(map(() => undefined))),
        ),
      ),
    ),
  };
}
