import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './entities/user.provider';
import { DatabaseModule } from 'src/database.module';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
})
export class UsersModule {}
