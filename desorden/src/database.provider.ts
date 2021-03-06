import { createConnection } from 'typeorm';
import { ModuleName } from './constants/moduleName';
import { genORMOptions } from './helpers/dbSetup';

let TypeORMConnOptions = (async () => await genORMOptions())();
export const databaseProviders = [
  {
    provide: ModuleName.DATABASE_CONNECTION,
    useFactory: async () => await createConnection(await TypeORMConnOptions),
  },
];
