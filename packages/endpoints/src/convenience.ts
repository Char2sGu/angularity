import { inject, InjectionToken } from '@angular/core';

import { EndpointSchemas } from './core';
import { GenerateEndpoints, generateEndpoints } from './generators';
import { EndpointInvoker } from './invoker';

/**
 * Convenience function that creates a typed `InjectionToken` with a default
 * value of a collection of endpoints generated from the given schemas,
 * through `generateEndpoints`.
 *
 * @see `generateEndpoints` - for manually generating endpoints
 * @see `createEndpointsFactory` - lower-level convenience function
 *
 * @example
 *  ```ts
 *  const USER_ENDPOINTS = new InjectionToken("USER_ENDPOINTS", {
 *    factory: createEndpointsFactory({
 *      list: {
 *        path: '/api/users',
 *        method: 'GET',
 *        params: null,
 *        response: $type<User[]>(),
 *      },
 *      create: {
 *        path: '/api/users',
 *        method: 'POST',
 *        params: { name: $type<string>(), 'gender?': $type<string>() },
 *        response: $type<User>(),
 *      },
 *    }),
 *  });
 *  ```
 *  ```ts
 *  private userEndpoints = inject(USER_ENDPOINTS);
 *  ```
 *  ```ts
 *  this.userEndpoints.list().subscribe(users => console.log(users));
 *  this.userEndpoints.create({ name: 'Char2s' }).subscribe(user => console.log(user));
 *  this.userEndpoints.create({ name: 'Char2s', gender: "Male" }).subscribe(user => console.log(user));
 *  ```
 *
 */
export function createEndpointsInjectionToken<Schemas extends EndpointSchemas>(
  name: string,
  schemas: Schemas,
): InjectionToken<GenerateEndpoints<Schemas>> {
  return new InjectionToken(name, { factory: createEndpointsFactory(schemas) });
}

/**
 * Convenience function that creates a factory function, which, once invoked
 * within an `InjectionContext` or with dependencies supplied, returns a collection
 * of endpoint functions.
 * @param schemas the declaration schema for the intended endpoint functions
 *
 * @remarks Can be used as the factory function within `Provider` or
 * `InjectionToken` declarations.
 *
 * @see `generateEndpoints` - for manually generating endpoints
 * @see `createEndpointsInjectionToken` - higher-level convenience function for
 * using this function within an `InjectionToken` declaration
 *
 * @example
 *  ```ts
 *  const USER_ENDPOINTS = new InjectionToken("USER_ENDPOINTS", {
 *    factory: createEndpointsFactory({
 *      list: {
 *        path: '/api/users',
 *        method: 'GET',
 *        params: null,
 *        response: $type<User[]>(),
 *      },
 *      create: {
 *        path: '/api/users',
 *        method: 'POST',
 *        params: { name: $type<string>(), 'gender?': $type<string>() },
 *        response: $type<User>(),
 *      },
 *    }),
 *  });
 *  ```
 *  ```ts
 *  private userEndpoints = inject(USER_ENDPOINTS);
 *  ```
 *  ```ts
 *  this.userEndpoints.list().subscribe(users => console.log(users));
 *  this.userEndpoints.create({ name: 'Char2s' }).subscribe(user => console.log(user));
 *  this.userEndpoints.create({ name: 'Char2s', gender: "Male" }).subscribe(user => console.log(user));
 *  ```
 */
export function createEndpointsFactory<Schemas extends EndpointSchemas>(
  schemas: Schemas,
) {
  return (invoker = inject(EndpointInvoker)): GenerateEndpoints<Schemas> =>
    generateEndpoints(invoker, schemas);
}
