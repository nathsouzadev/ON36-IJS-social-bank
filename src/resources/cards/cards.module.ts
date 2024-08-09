import { Module } from '@nestjs/common';
import { cardsProvider } from '../../config/providers/cards.provider';

@Module({
  providers: cardsProvider,
})
export class CardsModule {}
