import { Module } from '@nestjs/common';
import { accountsProvider } from '../../config/providers/accounts.provider';

@Module({
  providers: accountsProvider,
})
export class AccountsModule {}
