import { randomUUID } from 'crypto';

export class Card {
  id: string;
  customerId: string;
  accountId: string;
  number: string;
  cvv: string;
  expirationDate: string;
  limit: number;

  constructor(data: { customerId: string; accountId: string }) {
    this.id = randomUUID();
    this.customerId = data.customerId;
    this.accountId = data.accountId;
    this.number = '4242505042425050';
    this.cvv = '123';
    this.expirationDate = '12/30';
    this.limit = 500;
  }
}
