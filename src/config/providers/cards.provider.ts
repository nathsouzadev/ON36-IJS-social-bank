import { ORMCardsRepository } from '../../resources/cards/repository/typeorm/cards.repository';
import { CardsRepository } from '../../resources/cards/repository/cards.repository';
import { CardsService } from '../../resources/cards/service/cards.service';
import { purchaseProvider } from './purchase.provider';

export const cardsProvider = [
  CardsService,
  { provide: CardsRepository, useClass: ORMCardsRepository },
  ...purchaseProvider
];
