import { IsEnum, IsIP, IsInt, IsString, Max, Min } from 'class-validator';

import { Modes } from './configuration.types';

import type { IConfiguration } from './configuration.types';

export class ConfigurationSchema implements IConfiguration {
  @IsEnum(Modes)
  MODE: Modes;

  @IsIP()
  SERVER_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  SERVER_PORT: number;

  @IsIP()
  DATABASE_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_SCHEMA: string;
}
