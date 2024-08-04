import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Dictionary } from '../entities/dictionary.entity';
import { CreateDictionaryDTO } from '../dto/createDictionary.dto';
import { UpdateDictionaryDTO } from '../dto/updateDictionary.dto';

import type { Repository } from 'typeorm';
import type { Record } from '../entities/record.entity';

@Injectable()
export class DictionaryService {
  public constructor(
    @InjectRepository(Dictionary) private readonly dictionaryRepository: Repository<Dictionary>,
  ) {}

  async getOne(id: string): Promise<Dictionary> {
    return this.dictionaryRepository.findOneByOrFail({ id });
  }

  async getAll(): Promise<Dictionary[]> {
    return this.dictionaryRepository.find();
  }

  async create(createDictionaryDto: CreateDictionaryDTO): Promise<Dictionary> {
    const insertResult = await this.dictionaryRepository.insert(createDictionaryDto);
    const dictionaryId = (insertResult.generatedMaps as [{ id: string }])[0].id;

    return this.dictionaryRepository.findOneByOrFail({ id: dictionaryId });
  }

  async update(id: string, updateDictionaryDto: UpdateDictionaryDTO): Promise<Dictionary> {
    await this.dictionaryRepository.update(id, updateDictionaryDto);
    return this.dictionaryRepository.findOneByOrFail({ id });
  }

  async remove(id: string): Promise<boolean> {
    return Boolean(await this.dictionaryRepository.delete(id));
  }

  async getRecords(id: string): Promise<Record[]> {
    const dictionary = await this.dictionaryRepository.findOne({
      where: { id },
      relations: ['records'],
    });

    return dictionary ? dictionary.records : [];
  }
}
