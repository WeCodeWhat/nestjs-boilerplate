import { ModuleName } from 'src/constants/moduleName';
import { Connection } from 'typeorm';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: ModuleName.USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [ModuleName.DATABASE_CONNECTION],
  },
];
