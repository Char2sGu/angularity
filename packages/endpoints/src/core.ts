import { TypeContainer } from '@angularity/core';
import { Observable } from 'rxjs';

// TODO: NgDoc is unable to parse the docs below
/**
 * A function representing an API endpoint.
 * @param params parameters to be sent to the endpoint.
 * @returns an observable response from the endpoint.
 */
export interface Endpoint {
  (params: Record<string, unknown> | void): Observable<unknown>;
}

/**
 * Declaration schema of an API endpoint.
 */
export interface EndpointSchema {
  /**
   * Path of the target API endpoint. The definition and format of "path" may
   * vary depending on the concrete `EndpointInvoker` implementation.
   */
  path: string;

  /**
   * The method to be used for invoking the endpoint. The definition of "method"
   * may vary depending on the concrete `EndpointInvoker` implementation.
   */
  method: string;

  /**
   * Declaration of acceptable parameters of the endpoint if any, used primarily
   * for type-inference at our end.
   */
  params: EndpointParamsSchema | null;

  /**
   * Declaration of the expected response of the endpoint, used primarily for
   * type-inference at our end.
   */
  response: TypeContainer<unknown>;
}

/**
 * Declaration schema of an API endpoint's parameters.
 *
 * Syntax:
 * - field: required payload parameter
 * - field?: optional payload parameter
 * - ?field: required query parameter
 * - ?field?: optional query parameter
 */
export interface EndpointParamsSchema {
  [param: string]: TypeContainer<unknown>;
}

/**
 * A collection of API endpoint schemas. The keys are the names of the endpoints.
 */
export interface EndpointSchemas {
  [name: string]: EndpointSchema;
}
