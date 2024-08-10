import { randomUUID } from 'crypto';
import { PurchaseModel } from '../models/purchase.model';

export class Purchase {
  id: string;
  cardId: string;
  amount: number;
  created_at: string;
  cnpj: string;

  constructor(purchase: PurchaseModel) {
    this.id = randomUUID();
    this.amount = purchase.amount;
    this.cardId = purchase.cardId;
    this.created_at = new Date().toISOString();
    this.cnpj = purchase.cnpj;
  }
}
