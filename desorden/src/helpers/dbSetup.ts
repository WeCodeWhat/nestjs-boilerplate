import { Environment, isEnvironment } from 'src/constants/Environment';
import { getConnectionOptions, ConnectionOptions } from 'typeorm';

const genORMOptions = async (): Promise<ConnectionOptions> => {
  let TypeORMConnOptions = await getConnectionOptions();
  console.log(TypeORMConnOptions);
  Object.assign<ConnectionOptions, Partial<ConnectionOptions>>(
    TypeORMConnOptions,
    {
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database:
        TypeORMConnOptions.database +
        (isEnvironment(Environment.TEST) ? `-${Environment.TEST}` : ''),
      dropSchema: isEnvironment(Environment.TEST),
    },
  );

  console.log(TypeORMConnOptions);

  return TypeORMConnOptions;
};

export { genORMOptions };
