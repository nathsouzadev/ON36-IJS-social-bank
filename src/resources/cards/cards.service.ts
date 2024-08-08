import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardsRepository } from './repository/cards.repository';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  create = (createCardDto: CreateCardDto): { card: Card } =>
    this.cardsRepository.create(createCardDto);
}
