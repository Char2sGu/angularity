import { ContainedTypeOf } from '@angularity/core';
import { Observable } from 'rxjs';

import {
  Endpoint,
  EndpointParamsSchema,
  EndpointSchema,
  EndpointSchemas,
} from './core';
import { EndpointInvoker } from './invoker';
import {
  interpolatePathTemplate,
  parsePathTemplate,
  PathTemplateParamNamesOf,
  PathTemplateParamsOf,
} from './path-template';

/**
 * Type function that accepts an `EndpointParamsSchema` type, resolves
 * its `params` definition into an object literal type.
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
 * Type function that accepts an `EndpointSchema` type, resolves
 * its `path` and `params` definitions into an object literal type.
 * @see `GenerateEndpoint`
 */
export type EndpointParamsOf<Schema extends EndpointSchema> =
  PathTemplateParamsOf<Schema['path']> extends infer PathParams
    ? Schema['params'] extends EndpointParamsSchema
      ? PathParams & ResolveEndpointParamsSchema<Schema['params']>
      : PathParams
    : never;

type VoidOrNonEmpty<T> = T extends Record<any, never> ? void : T;

/**
 * Type function that accepts an `EndpointSchema` type and returns
 * a function type that accepts an object of parameters as declared,
 * if any, and returns an observable of the response type as declared.
 * @see `generateEndpoint`
 */
export type GenerateEndpoint<Schema extends EndpointSchema> = (
  params: VoidOrNonEmpty<EndpointParamsOf<Schema>>,
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
 * const invoker = inject(EndpointInvoker);
 * const endpoint = generateEndpoint(invoker, {
 *   path: '/api/users/{{id}}',
 *   method: 'GET',
 *   params: null,
 *   response: $type<{ user: User }>(),
 * } as const);
 * endpoint({ id: '1' }).subscribe((response) => {
 *   // response from GET /api/users/1
 * });
 *  ```
 *
 * @example
 *  ```typescript
 *  const invoker = inject(EndpointInvoker);
 *  const endpoint = generateEndpoint(invoker, {
 *    path: '/api/users',
 *    method: 'POST',
 *    params: { name: $type<string>(), 'gender?': $type<string>() },
 *    response: $type<{ user: User }>(),
 *  })
 *  endpoint({ name: "Char2s" }).subscribe(response => {
 *    // response from POST /api/users
 *    console.log(response.user.id);
 *    console.log(response.user.name);
 *  })
 *  ```
 */
export function generateEndpoint<Schema extends EndpointSchema>(
  invoker: EndpointInvoker,
  schema: Schema,
): GenerateEndpoint<Schema> {
  const pathParamNames: Set<PathTemplateParamNamesOf<Schema['path']>> =
    parsePathTemplate(schema.path);

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
    const pathParams: Record<string, string> = {};
    const requestBody: Record<string, unknown> = {};
    const requestQuery: Record<string, any> = {};
    for (const param in params) {
      const paramType = paramMeta[param];
      if (pathParamNames.has(param as PathTemplateParamNamesOf<Schema['path']>))
        pathParams[param] = params[param] as string;
      else if (paramType === 'body') requestBody[param] = params[param];
      else if (paramType === 'query') requestQuery[param] = params[param];
      // else case: ignore extraneous parameters
    }
    return invoker.invoke({
      path: interpolatePathTemplate(
        schema.path as Schema['path'],
        (Object.keys(pathParams).length
          ? pathParams
          : undefined) as PathTemplateParamsOf<Schema['path']>,
      ),
      method: schema.method,
      payload: Object.keys(requestBody).length ? requestBody : undefined,
      query: Object.keys(requestQuery).length ? requestQuery : undefined,
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
