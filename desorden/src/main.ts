declare const module: any;

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule, TypeORMConnOptions } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(process.env.PORT ?? 8000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.table({
    PORT: process.env.PORT ?? 8000,
    ENVIRONMENT: process.env.NODE_ENV.trim(),
    DATABASE: (await TypeORMConnOptions).database,
  });
}
bootstrap();
