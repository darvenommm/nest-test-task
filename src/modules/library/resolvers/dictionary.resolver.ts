import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Dictionary } from '../entities/dictionary.entity';
import { Record } from '../entities/record.entity';
import { DictionaryService } from '../services/dictionary.service';
import { CreateDictionaryDTO } from '../dto/createDictionary.dto';
import { UpdateDictionaryDTO } from '../dto/updateDictionary.dto';

@Resolver(() => Dictionary)
export class DictionaryResolver {
  public constructor(private readonly dictionaryService: DictionaryService) {}

  @Query(() => Dictionary, { name: 'dictionary' })
  async getOne(@Args('id', { type: () => ID }) id: string): Promise<Dictionary> {
    return this.dictionaryService.getOne(id);
  }

  @Query(() => [Dictionary], { name: 'dictionaries' })
  async getAll(): Promise<Dictionary[]> {
    return this.dictionaryService.getAll();
  }

  @Mutation(() => Dictionary, { name: 'createDictionary' })
  async create(
    @Args('createDictionaryInput', { type: () => CreateDictionaryDTO })
    createDictionaryInput: CreateDictionaryDTO,
  ): Promise<Dictionary> {
    return this.dictionaryService.create(createDictionaryInput);
  }

  @Mutation(() => Dictionary, { name: 'updateDictionary' })
  async update(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateDictionaryInput', { type: () => UpdateDictionaryDTO })
    updateDictionaryInput: UpdateDictionaryDTO,
  ): Promise<Dictionary> {
    return this.dictionaryService.update(id, updateDictionaryInput);
  }

  @Mutation(() => Boolean, { name: 'removeDictionary' })
  async remove(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.dictionaryService.remove(id);
  }

  @ResolveField('records', () => [Record])
  async getRecords(@Parent() { id }: Dictionary) {
    return this.dictionaryService.getRecords(id);
  }
}
