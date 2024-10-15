import { inject, InjectionToken } from '@angular/core';

import { EndpointSchemas } from './core';
import { GenerateEndpoints, generateEndpoints } from './generators';
import { EndpointInvoker } from './invoker';

/**
 * Creates a typed Injection Token whose default value is a collection of endpoints
 * generated from the given schemas, via `generateEndpoints`.
 * @deprecated Prefer `useEndpointsFactory`.
 */
export function createEndpointsInjectionToken<Schemas extends EndpointSchemas>(
  name: string,
  schemas: Schemas,
): InjectionToken<GenerateEndpoints<Schemas>> {
  return new InjectionToken(name, {
    factory: (invoker = inject(EndpointInvoker)) =>
      generateEndpoints(invoker, schemas),
  });
}
