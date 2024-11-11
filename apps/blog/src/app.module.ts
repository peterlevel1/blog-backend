import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MulterModule } from '@nestjs/platform-express';
import { bizModules } from './modules';
import { databaseModules, repositoryProviders } from './databases';
import { coreProviders } from './common/providers';
import { middlewares } from './common/middlewares';
import { middlewareUtil } from './common/utils';
import { Log4jsModule, log4js } from './common/modules/log4js';
import { log4jsConfig } from './configs';
import { Pool } from 'mysql2';
import { InjectClient } from '@common/modules/mysql';

@Module({
  imports: [
    ...bizModules,
    ...databaseModules,
    CacheModule.register(),
    Log4jsModule.forRoot(log4jsConfig),
    MulterModule.register(),
  ],
  providers: [...coreProviders, ...repositoryProviders],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(
    @InjectClient()
    private readonly client: Pool,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    middlewareUtil.consumeMiddlewares(consumer, middlewares);
  }

  onApplicationBootstrap() {
    console.log('onApplicationBootstrap');
    // console.log('onApplicationBootstrap - this.client: %o', this.client);
  }

  async onApplicationShutdown(signal: string) {
    try {
      console.log('[app.onApplicationShutdown] signal: %s', signal);

      const log4jsShutdownErr = await new Promise((resolve) => {
        log4js.shutdown(resolve);
      });

      if (log4jsShutdownErr) {
        console.log('[app.onApplicationShutdown] log4js shutdown error: %s', log4jsShutdownErr);
      }

      // shutdown mysql2 connection pool
      const mysql2Error = await new Promise((resolve) => {
        this.client.end(resolve);
      });

      if (mysql2Error) {
        console.log('[app.onApplicationShutdown] mysql2 shutdown error: %s', mysql2Error);
      }
    } catch (err: unknown) {
      this.logger.error((err as Error)?.message || 'UNKNOWN APP SHUTDOWN ERROR', (err as Error)?.stack || '');
    }
  }
}
