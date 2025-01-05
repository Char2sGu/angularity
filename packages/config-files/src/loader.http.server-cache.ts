import { HttpInterceptorFn } from '@angular/common/http';
import { HTTP_SERVER_CACHE_KEY } from '@angularity/core/http';

import { CONFIG_FILE_REQUEST_CONTEXT } from './loader.http';

export const httpServerCacheConfigFilesInterceptor: HttpInterceptorFn = (
  req,
  next,
) => {
  const context = req.context.get(CONFIG_FILE_REQUEST_CONTEXT);
  if (!context) return next(req);
  if (!context.def.id) return next(req);
  const key = `config-files:${context.def.id}`;
  req = req.clone({ context: req.context.set(HTTP_SERVER_CACHE_KEY, key) });
  return next(req);
};
