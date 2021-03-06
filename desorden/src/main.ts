declare const module: any;

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TypeORMConnOptions } from './database.provider';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      validationError: { target: false },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

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
