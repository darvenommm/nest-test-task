import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Dictionary } from '../entities/dictionary.entity';
import { Record } from '../entities/record.entity';
import { RecordService } from '../services/record.service';
import { CreateRecordDTO } from '../dto/createRecord.dto';
import { UpdateRecordDTO } from '../dto/updateRecord.dto';

@Resolver(() => Record)
export class RecordResolver {
  public constructor(private readonly recordService: RecordService) {}

  @Query(() => Dictionary, { name: 'record' })
  async getOne(@Args('id', { type: () => ID }) id: string): Promise<Record> {
    return this.recordService.getOne(id);
  }

  @Query(() => [Record], { name: 'records' })
  async getAll(): Promise<Record[]> {
    return this.recordService.getAll();
  }

  @Mutation(() => Record, { name: 'createRecord' })
  async create(
    @Args('createRecordInput', { type: () => CreateRecordDTO })
    createRecordInput: CreateRecordDTO,
  ): Promise<Record> {
    return this.recordService.create(createRecordInput);
  }

  @Mutation(() => Record, { name: 'updateRecord' })
  async update(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateRecordInput', { type: () => UpdateRecordDTO })
    updateRecordInput: UpdateRecordDTO,
  ): Promise<Record> {
    return this.recordService.update(id, updateRecordInput);
  }

  @Mutation(() => Boolean, { name: 'removeRecord' })
  async remove(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.recordService.remove(id);
  }

  @ResolveField('dictionary', () => Dictionary)
  async getRecords(@Parent() { id }: Record) {
    return this.recordService.getDictionary(id);
  }
}
