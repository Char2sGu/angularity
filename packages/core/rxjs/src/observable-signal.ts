import {
  assertInInjectionContext,
  DestroyRef,
  inject,
  Injector,
  isSignal,
  Signal,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { Observable, share } from 'rxjs';

/**
 * A `Signal` that can also be observed as an `Observable`.
 */
export interface ObservableSignal<Value, InitialValue = Value>
  extends Signal<Value | InitialValue> {
  // TODO: use [Symbol.observable]
  // Currently, when rendered on server, the rxjs package is unable to access
  // our polyfilled Symbol.observable value for unknown reasons.
  /**
   * Observe the signal as an `Observable`.
   * The `Observable` will be lazily created and cached if possible.
   */
  observe(): Observable<Value>;
}

/**
 * Create an `ObservableSignal` from an synchronously `Observable`.
 */
export function toObservableSignal<Value>(
  observable: Observable<Value>,
): ObservableSignal<Value>;
/**
 * Create an `ObservableSignal` from an asynchronous `Observable` with an
 * initial value for the signal.
 */
export function toObservableSignal<Value, InitialValue>(
  initialValue: InitialValue,
  observable: Observable<Value>,
): ObservableSignal<Value, InitialValue>;
/**
 * Create an `ObservableSignal` from a `Signal`.
 */
export function toObservableSignal<Value>(
  signal: Signal<Value>,
): ObservableSignal<Value>;
export function toObservableSignal<Value, InitialValue>(
  ...args:
    | [Observable<unknown>]
    | [unknown, Observable<unknown>]
    | [Signal<Value>]
): ObservableSignal<Value, InitialValue> {
  assertInInjectionContext(toObservableSignal);
  const injector = inject(Injector);
  const destroyRef = injector.get(DestroyRef);

  const processSourceObservable = <T>(observable: Observable<T>) =>
    observable.pipe(
      share({ resetOnRefCountZero: false }),
      takeUntilDestroyed(destroyRef),
    );

  let signal: Signal<Value>; // in fact Signal<Value | InitialValue>
  let observableFactory: () => Observable<Value>;

  if (args.length === 1 && args[0] instanceof Observable) {
    let observable = args[0] as Observable<Value>;
    observable = processSourceObservable(observable);
    signal = toSignal(observable, { requireSync: true });
    observableFactory = () => observable;
  } else if (args.length === 2 && args[1] instanceof Observable) {
    const initialValue = args[0] as Value;
    let observable = args[1] as Observable<Value>;
    observable = processSourceObservable(observable);
    signal = toSignal(observable, { initialValue });
    observableFactory = () => observable;
  } else if (args.length === 1 && isSignal(args[0])) {
    signal = args[0];
    observableFactory = () => toObservable(signal, { injector });
  } else {
    throw new Error('Invalid arguments');
  }

  let observable: Observable<Value>;
  return Object.assign(signal, {
    observe: () => {
      observable ??= observableFactory();
      return observable;
    },
  });
}
