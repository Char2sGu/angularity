import { HttpClient } from '@angular/common/http';
import { forwardRef, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => SimpleHttpClientEndpointInvoker),
})
export abstract class EndpointInvoker {
  abstract invoke<T>(config: EndpointInvokeConfig): Observable<T>;
}

export interface EndpointInvokeConfig {
  path: string;
  method: string;
  payload?: unknown;
  query?: Record<
    string,
    string | number | boolean extends infer T ? T | T[] : never
  >;
}

@Injectable({
  providedIn: 'root',
})
export class SimpleHttpClientEndpointInvoker implements EndpointInvoker {
  private httpClient = inject(HttpClient);
  invoke<T>(config: EndpointInvokeConfig): Observable<T> {
    return this.httpClient.request<T>(config.method, config.path, {
      body: config.payload,
      params: config.query,
    });
  }
}
