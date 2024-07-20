import { Injectable } from '@nestjs/common';
import { AccountDto } from './dto/create-account.dto';
import { database } from '../../config/db/db';
import { Account } from './entities/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  db = database

  create(createAccountDto: AccountDto) {
    const updatedDb = [...this.db]
    const account = new Account(createAccountDto)
    updatedDb[createAccountDto.customerIndex].accounts.push(account)
    this.db = updatedDb

    return { account };
  }

  update(accountDto: UpdateAccountDto) {
    const updatedDb = [...this.db]
    const accounts = updatedDb[accountDto.customerIndex].accounts
    const accountIndex = accounts.findIndex((account: Account) => account.id === accountDto.accountId)
    
    accounts[accountIndex] = {
      ...accounts[accountIndex],
      type: accountDto.type,
    }

    this.db = updatedDb

    return { account: updatedDb[accountDto.customerIndex].accounts[accountIndex] }
  }
}
