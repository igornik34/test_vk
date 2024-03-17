import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const requestCache: Set<string> = new Set();

const uniqueNameMiddleware: Middleware<{}, RootState> = (store) => (next) => async (action) => {
  if (action.type.startsWith('api/')) {
    const { endpointName, requestId } = action.meta;
    if (endpointName === 'fetchAverageAge' && requestId) {
      const { arg: name } = action.payload;
      if (requestCache.has(name)) {
        throw new Error(`Запрос с именем ${name} уже был выполнен.`);
      } else {
        requestCache.add(name);
        try {
          const result = await next(action);
          return result;
        } finally {
          requestCache.delete(name);
        }
      }
    }
  }
  return next(action);
};

export default uniqueNameMiddleware;
