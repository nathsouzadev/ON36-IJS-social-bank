import { randomUUID } from 'crypto';
import { number } from '../../../lib/number';
import { expirationDate } from '../../../lib/expiration-date';

export class Card {
  id: string;
  customerId: string;
  accountId: string;
  number: string;
  cvv: string;
  expirationDate: string;
  limit: number;
  purchases: any[] = [];

  constructor(data: { customerId: string; accountId: string }) {
    this.id = randomUUID();
    this.customerId = data.customerId;
    this.accountId = data.accountId;
    this.number = number(16);
    this.cvv = number(3);
    this.expirationDate = expirationDate();
    this.limit = 500;
  }
}
