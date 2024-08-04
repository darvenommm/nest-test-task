export enum Modes {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export type IConfiguration = Readonly<{
  MODE: Modes;
  SERVER_HOST: string;
  SERVER_PORT: number;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_SCHEMA: string;
}>;

export type IConfigurationService = Readonly<{
  isProduction: boolean;
  isDevelopment: boolean;
  serverHost: string;
  serverPort: number;
  databaseHost: string;
  databasePort: number;
  databaseName: string;
  databaseUsername: string;
  databasePassword: string;
  databaseSchema: string;
}>;
