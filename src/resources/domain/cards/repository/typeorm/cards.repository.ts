import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../../../../config/db/entities/card.entity';
import { Repository } from 'typeorm';
import { CardsRepository } from '../cards.repository';
import { CreateCardDto } from '../../dto/create-card.dto';

@Injectable()
export class ORMCardsRepository implements CardsRepository {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  create = async ({ accountId, customerId }: CreateCardDto): Promise<Card> =>
    this.cardRepository.save({
      accountId,
      customerId,
    });

  get = async (id: string): Promise<Card> =>
    this.cardRepository.findOne({
      where: { id },
    });
}
