import { Module } from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CustomerController } from './customer.controller';
import { AccountsService } from '../accounts/accounts.service';
import { SavingsAccountService } from '../accounts/savings-account.service';
import { CurrentAccountService } from '../accounts/current-account.service';

@Module({
  controllers: [CustomerController],
  providers: [
    CustomerService,
    AccountsService,
    SavingsAccountService,
    CurrentAccountService,
  ],
})
export class CustomerModule {}
