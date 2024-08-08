import { randomUUID } from 'crypto';
import { AccountDto, AccountType } from '../dto/create-account.dto';
import { Card } from '../../../resources/cards/entities/card.entity';

export class Account {
  id: string;
  customerId: string;
  balance: number;
  type: AccountType;
  overdraftLimit: number;
  interestRate: number;
  card?: Card;

  constructor(data: AccountDto) {
    this.id = randomUUID();
    this.customerId = data.customerId;
    this.balance = data.balance;
    this.type = data.type;
    this.interestRate = 0.02;
    this.overdraftLimit = data.type === AccountType.CURRENT ? 1000 : 0;
  }
}
