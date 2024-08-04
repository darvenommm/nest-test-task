import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Dictionary } from './entities/dictionary.entity';
import { Record } from './entities/record.entity';
import { DictionaryService } from './services/dictionary.service';
import { DictionaryResolver } from './resolvers/dictionary.resolver';
import { RecordService } from './services/record.service';
import { RecordResolver } from './resolvers/record.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Dictionary, Record])],
  providers: [DictionaryService, DictionaryResolver, RecordService, RecordResolver],
})
export class LibraryModule {}
