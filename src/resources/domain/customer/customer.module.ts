import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { customersProvider } from '../../config/providers/customers.provider';
import { People } from '../../config/db/entities/people.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../../config/db/entities/customer.entity';
import { Account } from '../../config/db/entities/account.entity';
import { Card } from '../../config/db/entities/card.entity';
import { Purchase } from '../../config/db/entities/purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([People, Customer, Account, Card, Purchase]),
  ],
  controllers: [CustomerController],
  providers: customersProvider,
})
export class CustomerModule {}
