import { Module } from '@nestjs/common';
import { purchaseProvider } from '../../config/providers/purchase.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from '../../config/db/entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  providers: purchaseProvider,
})
export class PurchaseModule {}
