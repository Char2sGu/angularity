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

export abstract class DialogIoTypes<Input, Output> {
  [TYPES]?: [Input, Output];
}

export type DialogInputOf<T extends DialogIoTypes<any, any>> =
  T extends DialogIoTypes<infer Input, any> ? Input : never;

export type DialogOutputOf<T extends DialogIoTypes<any, any>> =
  T extends DialogIoTypes<any, infer Output> ? Output : never;

export type DialogRefOf<T extends DialogIoTypes<any, any>> = DialogRef<
  DialogOutputOf<T>,
  T
>;

export type DialogConfigOf<T extends DialogIoTypes<any, any>> = DialogConfig<
  DialogInputOf<T>,
  DialogRefOf<T>
>;

export interface DialogFacade<T extends DialogIoTypes<any, any>> {
  launch: (config?: DialogConfigOf<T>) => DialogRefOf<T>;
  ref: Signal<DialogRefOf<T> | undefined>;
}

export const useDialog = <T extends DialogIoTypes<any, any>>(
  component: Type<T>,
  configDefaults: Partial<DialogConfigOf<T>> = {},
  [
    service,
    injector,
    viewContainerRef,
    componentFactoryResolver,
    destroyRef,
  ] = [
    inject(Dialog),
    inject(Injector),
    inject(ViewContainerRef),
    inject(ComponentFactoryResolver),
    inject(DestroyRef),
  ],
): DialogFacade<T> => {
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
};
