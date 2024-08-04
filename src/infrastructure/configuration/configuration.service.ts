import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Modes } from './configuration.types';

import type { IConfigurationService, IConfiguration } from './configuration.types';

@Injectable()
export class ConfigurationService implements IConfigurationService {
  public constructor(
    @Inject(ConfigService) private readonly configService: ConfigService<IConfiguration, true>,
  ) {}

  // process
  public get isDevelopment(): boolean {
    return this.configService.get('MODE', { infer: true }) === Modes.DEVELOPMENT;
  }

  public get isProduction(): boolean {
    return this.configService.get('MODE', { infer: true }) === Modes.PRODUCTION;
  }

  // server
  public get serverHost(): string {
    if (this.isProduction) {
      return '0.0.0.0';
    }

    return this.configService.get('SERVER_HOST', { infer: true });
  }

  public get serverPort(): number {
    return this.configService.get('SERVER_PORT', { infer: true });
  }

  // database
  public get databaseHost(): string {
    if (this.isProduction) {
      return 'database';
    }

    return this.configService.get('DATABASE_HOST', { infer: true });
  }

  public get databasePort(): number {
    if (this.isProduction) {
      return 5432;
    }

    return this.configService.get('DATABASE_PORT', { infer: true });
  }

  public get databaseName(): string {
    return this.configService.get('DATABASE_NAME', { infer: true });
  }

  public get databaseUsername(): string {
    return this.configService.get('DATABASE_USERNAME', { infer: true });
  }

  public get databasePassword(): string {
    return this.configService.get('DATABASE_PASSWORD', { infer: true });
  }

  public get databaseSchema(): string {
    return this.configService.get('DATABASE_SCHEMA', { infer: true });
  }
}
