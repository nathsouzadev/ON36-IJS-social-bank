import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCardDto } from '../dto/create-card.dto';
import { CardsRepository } from '../repository/cards.repository';
import { Card } from '../../../config/db/entities/card.entity';
import { PurchaseService } from '../../../resources/purchase/purchase.service';
import { PurchaseDto } from '../dto/purchase.dto';
import { Purchase } from '../../../config/db/entities/purchase.entity';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly purchaseService: PurchaseService,
  ) {}

  create = async (createCardDto: CreateCardDto): Promise<Card> =>
    this.cardsRepository.create(createCardDto);

  purchase = async ({
    cardId,
    cvv,
    number,
    expirationDate,
    amount,
    cnpj,
  }: PurchaseDto): Promise<Purchase> => {
    const card = await this.cardsRepository.get(cardId);

    if (
      card.cvv !== cvv ||
      card.number !== number ||
      card.expirationDate !== expirationDate
    )
      throw new UnauthorizedException('Invalid card data');

    if (card.limit < amount)
      throw new UnauthorizedException('Insuficient founds');

    const purchase = this.purchaseService.create({
      cardId,
      amount,
      cnpj,
    });

    return purchase;
  };
}
