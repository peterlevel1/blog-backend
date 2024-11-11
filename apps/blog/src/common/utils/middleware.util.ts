import { isArray, isFunction } from 'lodash';
import { MiddlewareConsumer } from '@nestjs/common';
import { IMiddlewareConfig } from '../interfaces';

export const middlewareUtil = {
  consumeMiddlewares(consumer: MiddlewareConsumer, middlewares: IMiddlewareConfig[]) {
    try {
      for (const middlewareConfig of middlewares) {
        const { init, middleware, exclude, routes } = middlewareConfig;

        if (isFunction(init)) {
          init();
        }

        const consumed = consumer.apply(middleware);

        if (isArray(exclude)) {
          consumed.exclude(...exclude);
        }

        consumed.forRoutes(...routes);
      }
    } catch (err) {
      console.log('[middlewareUtil.consumeMiddlewares] error: %o', err);
      throw new Error(err);
    }
  },
};
