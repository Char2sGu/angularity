import { HttpClient } from '@angular/common/http';
import { forwardRef, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Service responsible for endpoint invoking. All endpoints must be invoked
 * through this service.
 * @remarks This service is abstract, with a default implementation
 * `HttpClientEndpointInvoker`.
 */
@Injectable({
  providedIn: 'root',
  useExisting: forwardRef(() => HttpClientEndpointInvoker),
})
export abstract class EndpointInvoker {
  /**
   * Invokes an API endpoint as specified in the provided configuration.
   * @param config contains all information for endpoint invoking.
   * @returns observable response from the endpoint
   */
  abstract invoke<T>(config: EndpointInvokeConfig): Observable<T>;
}

/**
 * Contextual information used for endpoint invoking.
 * @see `EndpointInvoker`
 */
export interface EndpointInvokeConfig {
  /**
   * Path of the target API endpoint. The definition and format of "path" may
   * vary depending on the concrete `EndpointInvoker` implementation.
   * This property is forward from the source `EndpointSchema`.
   */
  path: string;

  /**
   * The method to be used for invoking the endpoint. The definition of "method"
   * may vary depending on the concrete `EndpointInvoker` implementation.
   * This property is forward from the source `EndpointSchema`.
   */
  method: string;

  /**
   * The payload to be sent to the endpoint, if any.
   */
  payload?: unknown;

  /**
   * The query to be sent to the endpoint, if any. Only primitive types are
   * allowed as values.
   */
  query?: Record<
    string,
    string | number | boolean extends infer T ? T | T[] : never
  >;
}

/**
 * Minimal implementation of `EndpointInvoker` based on Angular's built-in
 * `HttpClient` service.
 *
 * @remarks When this implementation is used, `EndpointSchema` should specify a valid
 * relative or absolute HTTP path and a valid HTTP method e.g. "GET", "POST", etc.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpClientEndpointInvoker implements EndpointInvoker {
  protected httpClient = inject(HttpClient);
  invoke<T>(config: EndpointInvokeConfig): Observable<T> {
    return this.httpClient.request<T>(config.method, config.path, {
      body: config.payload,
      params: config.query,
    });
  }
}
