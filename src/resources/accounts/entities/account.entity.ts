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
    this.interestRate = 0.02;
    this.overdraftLimit = data.type === 'current' ? 1000 : 0;
  }

  validateOverdraftLimit(amount: number) {
    if (this.balance - amount < -this.overdraftLimit) {
      throw new Error('Overdraft limit exceeded');
    }
  }

  addInterest() {
    if (this.type === 'savings') {
      this.balance += this.balance * this.interestRate;
    }
  }

  transfer(amount: number, target: Account) {
    this.validateOverdraftLimit(amount);
    this.balance -= amount;
    target.balance += amount;
  }

  withdraw(amount: number) {
    this.validateOverdraftLimit(amount);
    this.balance -= amount;
  }
}
