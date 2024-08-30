import { Module } from '@nestjs/common';
import { accountsProvider } from '../../config/providers/accounts.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../config/db/entities/account.entity';
import { Card } from '../../config/db/entities/card.entity';
import { Purchase } from '../../config/db/entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Card, Purchase])],
  providers: accountsProvider,
})
export class AccountsModule {}
