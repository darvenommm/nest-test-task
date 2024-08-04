import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import compression from '@fastify/compress';

import { AppModule } from './app.module';
import { ConfigurationService } from '@infrastructure/configuration';

import type { NestFastifyApplication } from '@nestjs/platform-fastify';

const bootstrap = async () => {
  const application = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const config = application.get(ConfigurationService);

  if (config.isProduction) {
    await application.register(compression, { encodings: ['br', 'gzip'] });
  }

  await application.listen(config.serverPort, config.serverHost);
};

bootstrap();
