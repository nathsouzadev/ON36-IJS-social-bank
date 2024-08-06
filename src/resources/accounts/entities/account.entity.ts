import { randomUUID } from 'crypto';
import { AccountDto, AccountType } from '../dto/create-account.dto';

export class Account {
  id: string;
  customerId: string;
  balance: number;
  type: AccountType;
  overdraftLimit: number;
  interestRate: number;
  card?: any;

  constructor(data: AccountDto) {
    const accountuntId = randomUUID();
    this.id = accountuntId;
    this.customerId = data.customerId;
    this.balance = data.balance;
    this.type = data.type;
    this.interestRate = 0.02;
    this.overdraftLimit = data.type === AccountType.CURRENT ? 1000 : 0;
    this.card = data.type === AccountType.CURRENT && {
      id: accountuntId,
      accountId: this.id,
      customerId: data.customerId,
      number: '4242505042425050',
      cvv: '123',
      expirationDate: '12/30',
      limit: 500,
    };
  }
}
