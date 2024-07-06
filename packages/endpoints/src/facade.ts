import { inject } from '@angular/core';

import { EndpointSchemas } from './core';
import { GenerateEndpoints, generateEndpoints } from './generators';
import { EndpointInvoker } from './invoker';

export const useEndpointsFactory =
  <Schemas extends EndpointSchemas>(
    schemas: Schemas,
    invoker = inject(EndpointInvoker),
  ) =>
  (): GenerateEndpoints<Schemas> =>
    generateEndpoints(invoker, schemas);
