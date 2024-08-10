import { Module } from '@nestjs/common';
import { cardsProvider } from '../../config/providers/cards.provider';
import { CardsController } from './cards.controller';

@Module({
  controllers: [CardsController],
  providers: cardsProvider,
})
export class CardsModule {}
