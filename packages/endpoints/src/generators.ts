import { ContainedTypeOf } from '@angularity/core';
import { Observable } from 'rxjs';

import {
  Endpoint,
  EndpointParamsSchema,
  EndpointSchema,
  EndpointSchemas,
} from './core';
import { EndpointInvoker } from './invoker';

/**
 * Computed type that resolves a `EndpointParamsSchema` type into an object type
 * that can be used as a parameter to an endpoint function.
 * @see `GenerateEndpoint`
 */
export type ResolveEndpointParamsSchema<Schema extends EndpointParamsSchema> = {
  [K in keyof Schema as K extends `${string}?`
    ? never
    : K extends `?${infer N}`
      ? N
      : K]: ContainedTypeOf<Schema[K]>;
} & {
  [K in keyof Schema as K extends `${infer P}?`
    ? P extends `?${infer N}`
      ? N
      : P
    : never]?: ContainedTypeOf<Schema[K]>;
};

/**
 * Computed type that resolves an `EndpointSchema` type into a function type
 * which accepts an object of parameters as declared, if any, and returns an
 * observable of the response type as declared.
 * @see `generateEndpoint`
 */
export type GenerateEndpoint<Schema extends EndpointSchema> = (
  params: Schema['params'] extends EndpointParamsSchema
    ? ResolveEndpointParamsSchema<Schema['params']>
    : void,
) => Observable<ContainedTypeOf<Schema['response']>>;

/**
 * Resolves an `EndpointSchema` object into a function, which accepts an object
 * of parameters as declared, if any, and returns an observable response.
 * @param invoker the `EndpointInvoker` instance to use under the hood
 * @param schema the declaration schema of the endpoint
 *
 * @see `generateEndpoints`
 *
 * @example
 *  ```typescript
 *  const invoker = inject(EndpointInvoker);
 *  const endpoint = generateEndpoint(invoker, {
 *    path: '/api/users',
 *    method: 'GET',
 *    params: null,
 *    response: $type<{ id: 'number', name: 'string' }>(),
 *  })
 *  endpoint().subscribe(response => {
 *    console.log(response.id);
 *    console.log(response.name);
 *  })
 *  ```
 *
 * @example
 *  ```typescript
 *  const invoker = inject(EndpointInvoker);
 *  const endpoint = generateEndpoint(invoker, {
 *    path: '/api/users',
 *    method: 'POST',
 *    params: { name: $type<string>(), 'gender?': $type<string>() },
 *    response: $type<{ id: 'number', name: 'string' }>(),
 *  })
 *  endpoint({ name: "Char2s" }).subscribe(response => {
 *    console.log(response.id);
 *    console.log(response.name);
 *  })
 *  ```
 */
export function generateEndpoint<Schema extends EndpointSchema>(
  invoker: EndpointInvoker,
  schema: Schema,
): GenerateEndpoint<Schema> {
  const paramMeta: Record<string, 'body' | 'query'> = {};
  for (const param in schema.params)
    if (param.startsWith('?')) {
      const name = param.endsWith('?') ? param.slice(1, -1) : param.slice(1);
      paramMeta[name] = 'query';
    } else {
      const name = param.endsWith('?') ? param.slice(0, -1) : param;
      paramMeta[name] = 'body';
    }

  const endpoint: Endpoint = (params) => {
    if (!params)
      return invoker.invoke({
        path: schema.path,
        method: schema.method,
      });
    const requestPayload: Record<string, unknown> = {};
    const requestQuery: Record<string, unknown> = {};
    for (const param in params) {
      const paramType = paramMeta[param];
      if (paramType === 'body') requestPayload[param] = params[param];
      else if (paramType === 'query') requestQuery[param] = params[param];
    }
    return invoker.invoke({
      path: schema.path,
      method: schema.method,
      payload: requestPayload,
      query: requestQuery as Record<string, any>,
    });
  };

  return endpoint as any;
}

/**
 * Bulk version of `GenerateEndpoint`. Accepts an `EndpointSchemas` type
 * and apply `GenerateEndpoint` on each of the entries.
 * @see `generateEndpoints`
 */
export type GenerateEndpoints<Schemas extends EndpointSchemas> = {
  [Name in keyof Schemas]: GenerateEndpoint<Schemas[Name]>;
};

/**
 * Bulk version of `generateEndpoint`. Accepts an `EndpointSchemas` object
 * and apply `generateEndpoint` on each of the entries.
 * @param invoker the `EndpointInvoker` instance to use under the hood
 * @param schemas schema declarations
 *
 * @see `generateEndpoint`
 * @see `useEndpointsFactory`
 *
 * @example
 *  ```ts
 *  const invoker = inject(EndpointInvoker);
 *  const userEndpoints = generateEndpoints(invoker, {
 *    list: {
 *      path: '/api/users',
 *      method: 'GET',
 *      params: null,
 *      response: $type<User[]>(),
 *    },
 *    create: {
 *      path: '/api/users',
 *      method: 'POST',
 *      params: { name: $type<string>(), 'gender?': $type<string>() },
 *      response: $type<User>(),
 *    },
 *  });
 *  userEndpoints.list().subscribe(users => console.log(users));
 *  userEndpoints.create({ name: 'Char2s' }).subscribe(user => console.log(user));
 *  userEndpoints.create({ name: 'Char2s', gender: "Male" }).subscribe(user => console.log(user));
 *  ```
 */
export function generateEndpoints<Schemas extends EndpointSchemas>(
  invoker: EndpointInvoker,
  schemas: Schemas,
): GenerateEndpoints<Schemas> {
  const endpoints: Record<string, Endpoint> = {};
  for (const name in schemas)
    endpoints[name] = generateEndpoint(invoker, schemas[name]) as Endpoint;
  return endpoints as any;
}
