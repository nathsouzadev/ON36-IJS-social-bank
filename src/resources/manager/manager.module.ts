import { Module } from '@nestjs/common';
import { ManagerService } from './service/manager.service';
import { ManagerController } from './manager.controller';
import { CustomerService } from '../customer/service/customer.service';
import { AccountsService } from '../accounts/accounts.service';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService, CustomerService, AccountsService],
})
export class ManagerModule {}
