import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { Log4jsLogger } from './common/modules/log4js';
import { appConfig } from './configs/app.config';
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {
  // node -r dotenv/config -r tsconfig-paths/register -r ts-node/register ./src/main.ts'
  dotenv.config();
}

async function startApp() {
  await bootstrap();

  const { AppModule } = await import('./app.module');
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Log4jsLogger));
  app.setGlobalPrefix(appConfig.globalPrefix);
  // app.useGlobalGuards(new AuthGuard(new Relec))
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}

startApp().catch(console.log);
