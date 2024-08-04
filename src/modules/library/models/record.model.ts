import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Dictionary } from './dictionary.model';

import type { Relation } from 'typeorm';

@Entity({ name: 'records' })
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 128 })
  @Index()
  name: string;

  @Column('varchar', { length: 128 })
  @Index()
  value: string;

  @Column()
  color: string;

  @ManyToOne(() => Dictionary, (dictionary: Dictionary) => dictionary.records)
  dictionary: Relation<Dictionary>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
