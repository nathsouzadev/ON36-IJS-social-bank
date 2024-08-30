import { randomUUID } from 'crypto';
import { People } from '../../../resources/people/entities/person.entity';
import { Account } from './account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Manager } from './manager.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string = randomUUID();

  @Column({ nullable: true })
  managerId?: string | null;

  @Column()
  peopleId: string;

  @OneToOne(() => People)
  @JoinColumn()
  people: People;

  @ManyToOne(() => Manager, (manager) => manager.customers)
  @JoinColumn()
  manager?: Manager;

  @OneToMany(() => Account, (account) => account.customerId)
  @JoinColumn()
  accounts: Account[];

  constructor(peopleId: string, managerId: string | null) {
    this.peopleId = peopleId;
    this.managerId = managerId;
  }
}
