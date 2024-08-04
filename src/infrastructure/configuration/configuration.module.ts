import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConfigurationService } from './configuration.service';
import { validateConfiguration } from './configuration.validator';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, expandVariables: true, validate: validateConfiguration }),
  ],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
