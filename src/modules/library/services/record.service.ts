import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Record } from '../entities/record.entity';
import { Dictionary } from '../entities/dictionary.entity';
import { UpdateRecordDTO } from '../dto/updateRecord.dto';

import type { Repository } from 'typeorm';
import { CreateRecordDTO } from '../dto/createRecord.dto';

@Injectable()
export class RecordService {
  public constructor(
    @InjectRepository(Record) private readonly recordRepository: Repository<Record>,
    @InjectRepository(Dictionary) private readonly dictionaryRepository: Repository<Dictionary>,
  ) {}

  async getOne(id: string): Promise<Record> {
    return this.recordRepository.findOneByOrFail({ id });
  }

  async getAll(): Promise<Record[]> {
    return this.recordRepository.find();
  }

  async create({ dictionaryId, ...recordProperties }: CreateRecordDTO): Promise<Record> {
    const dictionary = await this.dictionaryRepository.findOneByOrFail({ id: dictionaryId });
    const insertResult = await this.recordRepository.insert({ ...recordProperties, dictionary });
    const recordId = (insertResult.generatedMaps as [{ id: string }])[0].id;

    return this.recordRepository.findOneByOrFail({ id: recordId });
  }

  async update(
    id: string,
    { dictionaryId, ...recordProperties }: UpdateRecordDTO,
  ): Promise<Record> {
    const dataForUpdating: Omit<UpdateRecordDTO, 'dictionaryId'> & { dictionary?: Dictionary } = {
      ...recordProperties,
    };

    if (dictionaryId) {
      const dictionary = await this.dictionaryRepository.findOneByOrFail({ id: dictionaryId });
      dataForUpdating.dictionary = dictionary;
    }

    this.recordRepository.update(id, dataForUpdating);

    return this.recordRepository.findOneByOrFail({ id });
  }

  async remove(id: string): Promise<boolean> {
    return Boolean(await this.recordRepository.delete(id));
  }

  async getDictionary(id: string): Promise<Dictionary> {
    console.log(
      await this.recordRepository.findOneOrFail({ where: { id }, relations: ['dictionary'] }),
    );
    return (await this.recordRepository.findOneOrFail({ where: { id }, relations: ['dictionary'] }))
      .dictionary!;
  }
}
