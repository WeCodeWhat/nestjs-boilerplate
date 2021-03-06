declare const module: any;

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TypeORMConnOptions } from './database.provider';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(process.env.PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.table({
    PORT: process.env.PORT,
    ENVIRONMENT: process.env.NODE_ENV.trim(),
    DATABASE: (await TypeORMConnOptions).database,
  });
}
bootstrap();
