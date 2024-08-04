import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Dictionary } from './models/dictionary.model';
import { Record } from './models/record.model';

@Module({
  imports: [TypeOrmModule.forFeature([Dictionary, Record])],
})
export class LibraryModule {}
