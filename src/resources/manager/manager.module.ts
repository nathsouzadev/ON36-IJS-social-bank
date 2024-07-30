import { Module } from '@nestjs/common';
import { ManagerService } from './service/manager.service';
import { ManagerController } from './manager.controller';
import { CustomerService } from '../customer/service/customer.service';
import { AccountsService } from '../accounts/accounts.service';
import { CurrentAccountService } from '../accounts/current-account.service';
import { SavingsAccountService } from '../accounts/savings-account.service';

@Module({
  controllers: [ManagerController],
  providers: [
    ManagerService,
    CustomerService,
    AccountsService,
    SavingsAccountService,
    CurrentAccountService,
  ],
})
export class ManagerModule {}
