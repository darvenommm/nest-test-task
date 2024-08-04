import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Dictionary } from './dictionary.entity';

import type { Relation } from 'typeorm';

@Entity({ name: 'records' })
@Index('record_name_and_value_unique_index', ['name', 'value'], { unique: true })
@ObjectType()
export class Record {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar', { length: 128 })
  // has index through record_name_and_value_unique_index above
  @Field()
  name: string;

  @Column('varchar', { length: 128 })
  @Index('record_value_index')
  @Field()
  value: string;

  @Column('varchar', { length: 32 })
  @Field()
  color: string;

  @ManyToOne(() => Dictionary, (dictionary: Dictionary) => dictionary.records)
  @Field(() => Dictionary)
  dictionary: Relation<Dictionary>;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;
}
