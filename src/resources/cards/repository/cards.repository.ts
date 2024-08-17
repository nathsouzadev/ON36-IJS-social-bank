import { Injectable, UnauthorizedException } from '@nestjs/common';
import { database } from '../../../config/db/db';
import { Card } from '../entities/card.entity';
import { CreateCardDto } from '../dto/create-card.dto';
import { Purchase } from '../entities/purchase.entity';
import { PurchaseModel } from '../models/purchase.model';

@Injectable()
export class CardsRepository {
  db = database;

  create = (createCardDto: CreateCardDto): { card: Card } => {
    const updatedDb = [...this.db];
    const card = new Card(createCardDto);
    
    updatedDb.forEach(customer => {
      if(Object.keys(customer).includes('accounts')) {
        customer['accounts'].forEach(account => {
          if(account.id === createCardDto.accountId) {
            if(account.card !== null){
              throw new UnauthorizedException('Card already exists');
            }
            
            account.card = card;
          }
        })
      }
    })

    this.db = updatedDb;

    return { card };
  };

  get = (id: string): { card: Card } => {
    const customers = this.db.filter((customer) =>
      Object.keys(customer).includes('accounts'),
    );
    const accounts = customers.map((customer) => customer['accounts']).flat();
    const cards = accounts.map((account) => account['card']).flat();

    return { card: cards.find((card) => card.id === id) };
  };

  purchase = (data: PurchaseModel): { purchase: Purchase } => {
    const purchase = new Purchase(data);

    const updatedDb = [...this.db];
    updatedDb.forEach(customer => {
      if(Object.keys(customer).includes('accounts')) {
        customer['accounts'].forEach(account => {
          if(Object.keys(account).includes('card')) {
            if(account.card !== null){
              account.card.purchases.push(purchase);
            }
          }
        })
      }
    })

    this.db = updatedDb;

    return { purchase };
  }
}
