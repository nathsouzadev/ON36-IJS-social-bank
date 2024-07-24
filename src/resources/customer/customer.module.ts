import { Module } from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CustomerController } from './customer.controller';
import { AccountsService } from '../accounts/accounts.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, AccountsService],
})
export class CustomerModule {}
