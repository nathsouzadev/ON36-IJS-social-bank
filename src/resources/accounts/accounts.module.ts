import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { SavingsAccountService } from './savings-account.service';
import { CurrentAccountService } from './current-account.service';

@Module({
  providers: [AccountsService, SavingsAccountService, CurrentAccountService],
})
export class AccountsModule {}
