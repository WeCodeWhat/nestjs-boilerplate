import { Module, NestModule, RequestMethod, CacheModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './helpers/env.validation';
import envConfiguration from './config/env.config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      validate,
      load: [envConfiguration],
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
