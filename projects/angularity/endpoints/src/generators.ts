import { ContainedTypeOf } from '@angularity/core';
import { Observable } from 'rxjs';

import {
  Endpoint,
  EndpointParamsSchema,
  EndpointSchema,
  EndpointSchemas,
} from './core';
import { EndpointInvoker } from './invoker';

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

export type GenerateEndpoint<Schema extends EndpointSchema> = (
  params: Schema['params'] extends EndpointParamsSchema
    ? ResolveEndpointParamsSchema<Schema['params']>
    : void,
) => Observable<ContainedTypeOf<Schema['response']>>;

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

export type GenerateEndpoints<Schemas extends EndpointSchemas> = {
  [Name in keyof Schemas]: GenerateEndpoint<Schemas[Name]>;
};

export function generateEndpoints<Schemas extends EndpointSchemas>(
  invoker: EndpointInvoker,
  schemas: Schemas,
): GenerateEndpoints<Schemas> {
  const endpoints: Record<string, Endpoint> = {};
  for (const name in schemas)
    endpoints[name] = generateEndpoint(invoker, schemas[name]) as Endpoint;
  return endpoints as any;
}
