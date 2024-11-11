import { Request as IExpressRequest } from 'express';
import { IJwtUserPayload } from '@common/interfaces';
import { UserEntity } from '@databases/mysql';

declare module 'express' {
  interface Request extends IExpressRequest {
    user: UserEntity;
    language?: string;
  }
}
