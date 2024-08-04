import { Module } from '@nestjs/common';

import { ConfigurationModule } from '@infrastructure/configuration';
import { DatabaseModule } from '@infrastructure/database';

@Module({
  imports: [ConfigurationModule, DatabaseModule],
})
export class AppModule {}
