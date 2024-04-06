import { DialogConfig, DialogRef } from '@angular/cdk/dialog';

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

export function createDialogConfig<T extends DialogIoTypes<any, any>>(
  config: DialogConfigOf<T>,
): typeof config {
  return config;
}
