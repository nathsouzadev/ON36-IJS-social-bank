import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CardsService } from './service/cards.service';
import { PurchaseDto } from './dto/purchase.dto';

@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post(':id/purchase')
  purchase(
    @Param('id') id: string,
    @Body() purchaseDto: PurchaseDto
  ) {
    return this.cardsService.purchase({ cardId: id, ...purchaseDto });
  }
}
