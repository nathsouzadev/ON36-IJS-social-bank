import { Injectable } from '@nestjs/common';
import { database } from '../../../config/db/db';
import { Card } from '../entities/card.entity';
import { CreateCardDto } from '../dto/create-card.dto';

@Injectable()
export class CardsRepository {
  db = database;

  create = (createCardDto: CreateCardDto): { card: Card } => {
    const updatedDb = [...this.db];
    const card = new Card(createCardDto);
    updatedDb[createCardDto.customerIndex]['accounts'][
      createCardDto.accountIndex
    ]['cards'] = card;

    this.db = updatedDb;
    
    return { card };
  }
}
