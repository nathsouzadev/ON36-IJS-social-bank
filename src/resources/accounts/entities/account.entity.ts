import { randomUUID } from 'crypto';
import { AccountDto } from '../dto/create-account.dto';

export class Account {
  id: string;
  customerId: string;
  balance: number;
  type: string;
  overdraftLimit: number;
  interestRate: number;

  constructor(data: AccountDto) {
    this.id = randomUUID();
    this.customerId = data.customerId;
    this.balance = data.balance;
    this.type = data.type;
    data.type === 'current'
      ? ((this.overdraftLimit = 1000), (this.interestRate = 0))
      : ((this.overdraftLimit = 0), (this.interestRate = 0.05));
  }
}
