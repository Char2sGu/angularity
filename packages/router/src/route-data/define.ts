import { Data } from '@angular/router';

import { RouteDataToken } from './token';

export interface RouteDataDefinition<T, U extends T = T> {
  token: RouteDataToken<T>;
  value: U;
}

export function defineRouteData<T, U extends T>(
  def: RouteDataDefinition<T, U>,
): typeof def {
  return def;
}

export function compileRouteData(
  definitions: RouteDataDefinition<any>[],
): Data {
  const data: Data = {};
  for (const def of definitions) data[def.token.key] = def.value;
  return data;
}
