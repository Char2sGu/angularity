import { inject, InjectionToken } from '@angular/core';

import { EndpointSchemas } from './core';
import { GenerateEndpoints, generateEndpoints } from './generators';
import { EndpointInvoker } from './invoker';

/**@deprecated */
export function createEndpointsInjectionToken<Schemas extends EndpointSchemas>(
  name: string,
  schemas: Schemas,
): InjectionToken<GenerateEndpoints<Schemas>> {
  return new InjectionToken(name, {
    factory: (invoker = inject(EndpointInvoker)) =>
      generateEndpoints(invoker, schemas),
  });
}
