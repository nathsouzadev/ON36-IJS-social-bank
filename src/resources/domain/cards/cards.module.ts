import { Module } from '@nestjs/common';
import { cardsProvider } from '../../config/providers/cards.provider';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../../config/db/entities/card.entity';
import { Purchase } from '../../config/db/entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Purchase])],
  controllers: [CardsController],
  providers: cardsProvider,
})
export class CardsModule {}
