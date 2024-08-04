import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationService } from '@infrastructure/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigurationService) => ({
        type: 'postgres',
        host: config.databaseHost,
        port: config.databasePort,
        database: config.databaseName,
        username: config.databaseUsername,
        password: config.databasePassword,
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: config.isProduction ? 'file' : 'advanced-console',
      }),
      inject: [ConfigurationService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
