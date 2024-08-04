import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Record } from './record.entity';

import type { Relation } from 'typeorm';

@Entity({ name: 'dictionaries' })
@ObjectType()
export class Dictionary {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar', { length: '128' })
  @Index('dictionary_name_unique_index', { unique: true })
  @Field()
  name: string;

  @OneToMany(() => Record, (record: Record) => record.dictionary, { cascade: true })
  @Field(() => [Record])
  records: Relation<Record[]>;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;
}
