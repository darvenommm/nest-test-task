import { Module } from '@nestjs/common';

import { ConfigurationModule } from '@infrastructure/configuration';
import { DatabaseModule } from '@infrastructure/database';
import { LibraryModule } from '@modules/library';

@Module({
  imports: [ConfigurationModule, DatabaseModule, LibraryModule],
})
export class AppModule {}
