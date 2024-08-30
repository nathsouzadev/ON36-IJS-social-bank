import { randomUUID } from 'crypto';
import { number } from '../../../lib/number';
import { expirationDate } from '../../../lib/expiration-date';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Account } from './account.entity';
import { Purchase } from './purchase.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string = randomUUID();

  @Column()
  customerId: string;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @Column()
  accountId: string;

  @ManyToOne(() => Account, (account) => account.cards)
  @JoinColumn()
  account: Account;

  @Column()
  number: string;

  @Column()
  cvv: string;

  @Column()
  expirationDate: string;

  @Column({ default: 500 })
  limit: number;

  @OneToMany(() => Purchase, (purchase) => purchase.cardId)
  @JoinColumn()
  purchases: Purchase[];

  constructor(customerId: string, accountId: string) {
    this.customerId = customerId;
    this.accountId = accountId;
    this.number = number(16);
    this.cvv = number(3);
    this.expirationDate = expirationDate();
    this.limit = 500;
  }
}
