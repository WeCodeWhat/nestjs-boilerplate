import 'dotenv/config';

export enum Environment {
  TEST = 'test',
  PROD = 'production',
  DEV = 'development',
}

export const isEnvironment = (env: Environment) =>
  process.env.NODE_ENV.trim() == env;
