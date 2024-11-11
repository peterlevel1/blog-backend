import { MorganMiddleware } from '@nest-middlewares/morgan';
import { createStream } from 'rotating-file-stream';
import { pathConfig } from 'configs';
import { timeUtil } from '@common/utils';

export default {
  middleware: MorganMiddleware,
  routes: ['*'],
  init() {
    const morganPath = pathConfig.storage.logs.morgan.$path;

    MorganMiddleware.token('datetime', timeUtil.timestamp);

    MorganMiddleware.configure(':method | :url | :status | :res[content-length] | :response-time | :datetime', {
      stream: createStream('access.log', {
        path: morganPath,
        maxSize: '10M',
        interval: '1d',
      }),
    });
  },
};
