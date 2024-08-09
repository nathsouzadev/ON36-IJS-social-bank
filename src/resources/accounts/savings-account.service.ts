import { Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { AccountsService } from './accounts.service';

@Injectable()
export class SavingsAccountService extends AccountsService {
  addInterest = (
    customerIndex: number,
    accountId: string,
  ): { account: Account } =>
    this.deposit({
      amount: this.get(customerIndex, accountId).balance * 0.01,
      customerIndex,
      accountId
    });
}
