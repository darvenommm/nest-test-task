import { Module } from '@nestjs/common';

import { ConfigurationModule } from '@infrastructure/configuration';
import { DatabaseModule } from '@infrastructure/database';
import { GraphqlModule } from '@infrastructure/graphql';
import { LibraryModule } from '@modules/library';

@Module({
  imports: [ConfigurationModule, DatabaseModule, GraphqlModule, LibraryModule],
})
export class AppModule {}
