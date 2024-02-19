import { TypeContainer } from '@angularity/core';
import { Observable } from 'rxjs';

export interface Endpoint {
  (params: Record<string, unknown> | void): Observable<unknown>;
}

export interface EndpointSchema {
  path: string;
  method: string;
  params: EndpointParamsSchema | null;
  response: TypeContainer<unknown>;
}

export interface EndpointParamsSchema {
  [param: string]: TypeContainer<unknown>;
}

export interface EndpointSchemas {
  [name: string]: EndpointSchema;
}
