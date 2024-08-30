import { randomUUID } from 'crypto';
import { People } from './people.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity('managers')
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  id: string = randomUUID();

  @Column()
  peopleId: string | null;

  @OneToOne(() => People)
  @JoinColumn()
  people: People;

  @OneToMany(() => Customer, (customer) => customer.manager)
  @JoinColumn()
  customers: Customer[];

  constructor(peopleId: string | null) {
    this.peopleId = peopleId;
  }
}
