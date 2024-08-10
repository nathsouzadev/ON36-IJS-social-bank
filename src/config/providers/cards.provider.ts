import { CardsRepository } from '../../resources/cards/repository/cards.repository';
import { CardsService } from '../../resources/cards/service/cards.service';

export const cardsProvider = [CardsService, CardsRepository];
