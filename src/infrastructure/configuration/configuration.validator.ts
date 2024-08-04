import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ConfigurationSchema } from './configuration.schema';

import type { IConfiguration } from './configuration.types';

export const validateConfiguration = (configuration: Record<string, unknown>): IConfiguration => {
  const validatedConfig = plainToInstance(ConfigurationSchema, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
