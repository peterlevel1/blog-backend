import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Validator } from 'class-validator';
import { AppExceptionFilter } from '@common/filters';
import { AppValidationPipe } from '@common/pipes';
import { AppTransformInterceptor } from '@common/interceptors';
import { AuthGuard } from '@modules/auth';
import { Provider } from '@nestjs/common';
import { UserService } from '@modules/user';

export const ClassValidatorProvider = {
  provide: 'CLASS_VALIDATOR',
  useClass: Validator,
};

export const coreProviders: Provider[] = [
  {
    useClass: AuthGuard,
    provide: APP_GUARD,
  },
  {
    useClass: CacheInterceptor,
    provide: APP_INTERCEPTOR,
  },
  {
    useClass: AppValidationPipe,
    provide: APP_PIPE,
  },
  {
    useClass: AppTransformInterceptor,
    provide: APP_INTERCEPTOR,
  },
  {
    useClass: AppExceptionFilter,
    provide: APP_FILTER,
  },
  // UserService,
];
