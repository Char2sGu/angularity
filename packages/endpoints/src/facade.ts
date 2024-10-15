import { inject } from '@angular/core';

import { EndpointSchemas } from './core';
import { GenerateEndpoints, generateEndpoints } from './generators';
import { EndpointInvoker } from './invoker';

/**
 * Dependency Assembler of a factory function that takes a collection of
 * endpoint schemas and produces a collection of generated endpoint functions.
 *
 * @see `generateEndpoints`
 */
export const useEndpointsFactory =
  <Schemas extends EndpointSchemas>(
    schemas: Schemas,
    invoker = inject(EndpointInvoker),
  ) =>
  (): GenerateEndpoints<Schemas> =>
    generateEndpoints(invoker, schemas);
