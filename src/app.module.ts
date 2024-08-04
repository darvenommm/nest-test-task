import { Module, ValidationPipe } from '@nestjs/common';

import { ConfigurationModule } from '@infrastructure/configuration';
import { DatabaseModule } from '@infrastructure/database';
import { GraphqlModule } from '@infrastructure/graphql';
import { LibraryModule } from '@modules/library';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ConfigurationModule, DatabaseModule, GraphqlModule, LibraryModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {}
