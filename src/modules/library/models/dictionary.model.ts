import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Record } from './record.model';

import type { Relation } from 'typeorm';

@Entity({ name: 'dictionaries' })
export class Dictionary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: '128' })
  @Index({ unique: true })
  name: string;

  @OneToMany(() => Record, (record: Record) => record.dictionary, { cascade: true })
  records: Relation<Record[]>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
