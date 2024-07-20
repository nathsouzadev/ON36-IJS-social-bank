import { Injectable } from '@nestjs/common';
import { AccountDto } from './dto/create-account.dto';
import { database } from '../../config/db/db';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  db = database

  create(createAccountDto: AccountDto) {
    console.log('DATABASE ACCOUNT', this.db[createAccountDto.customerIndex])
    const updatedDb = [...this.db]
    const account = new Account(createAccountDto)
    updatedDb[createAccountDto.customerIndex].accounts.push(account)
    this.db = updatedDb

    return { account };
  }
}
