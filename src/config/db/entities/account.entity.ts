import { randomUUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { AccountType } from '../../../resources/accounts/dto/create-account.dto';
import { Card } from './card.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string = randomUUID();

  @Column()
  customerId: string;

  @ManyToOne(() => Customer, (customer) => customer.accounts)
  @JoinColumn()
  customer: Customer;

  @Column({ default: 0 })
  balance: number;

  @Column()
  type: string;

  @Column({ nullable: true, default: 0 })
  overdraftLimit: number;

  @Column({ nullable: true, default: 0 })
  interestRate: number;

  @Column({ default: true })
  active: boolean = true;

  @OneToMany(() => Card, (card) => card.accountId)
  @JoinColumn()
  cards: Card[]

  constructor(customerId: string, balance: number = 0, type: AccountType) {
    this.customerId = customerId;
    this.balance = balance;
    this.type = type;
    this.interestRate = 0.02;
    this.overdraftLimit = type === AccountType.SAVINGS ? 0 : 1000;
  }
}
