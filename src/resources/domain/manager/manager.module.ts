import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { managersProvider } from '../../config/providers/managers.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from '../../config/db/entities/people.entity';
import { Manager } from '../../config/db/entities/manager.entity';
import { Customer } from '../../config/db/entities/customer.entity';
import { Account } from '../../config/db/entities/account.entity';
import { Card } from '../../config/db/entities/card.entity';
import { Purchase } from '../../config/db/entities/purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People,
      Manager,
      Customer,
      Account,
      Card,
      Purchase,
    ]),
  ],
  controllers: [ManagerController],
  providers: managersProvider,
})
export class ManagerModule {}
