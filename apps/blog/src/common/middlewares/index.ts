import { IMiddlewareConfig } from '../interfaces';
import morganMiddleware from './morgan.middleware';
import uploadDirectoryLimitMiddleware from './upload-directory-limit.middleware';

export const middlewares: IMiddlewareConfig[] = [morganMiddleware, uploadDirectoryLimitMiddleware];
