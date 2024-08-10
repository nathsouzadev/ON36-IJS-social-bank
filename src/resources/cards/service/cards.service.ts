import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCardDto } from '../dto/create-card.dto';
import { CardsRepository } from '../repository/cards.repository';
import { Card } from '../entities/card.entity';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  create = (createCardDto: CreateCardDto): { card: Card } =>
    this.cardsRepository.create(createCardDto);

  purchase = (data: {
    cardId: string;
    amount: number;
    cnpj: string;
    number: string;
    cvv: string;
    expirationDate: string;
  }) => {
    const { card } = this.cardsRepository.get(data.cardId);

    if (
      card.cvv !== data.cvv ||
      card.number !== data.number ||
      card.expirationDate !== data.expirationDate
    )
      throw new UnauthorizedException('Invalid card data');

    if (card.limit < data.amount)
      throw new UnauthorizedException('Insuficient founds');

    const purchase = this.cardsRepository.purchase({
      cardId: data.cardId,
      amount: data.amount,
      cnpj: data.cnpj,
    });

    return purchase;
  };
}
