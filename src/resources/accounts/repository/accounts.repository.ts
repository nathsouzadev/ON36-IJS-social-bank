import { Injectable } from '@nestjs/common';
import { database } from '../../../config/db/db';
import { AccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountsRepository {
  db = database;

  create(createAccountDto: AccountDto): { account: Account } {
    const updatedDb = [...this.db];
    const account = new Account(createAccountDto);
    
    updatedDb.forEach(customer => {
      if(Object.keys(customer).includes('accounts')) {
        if(customer.id === createAccountDto.customerId) {
          customer['accounts'].push(account);
        }
      }
    })

    this.db = updatedDb;

    return { account };
  }

  update(accountDto: UpdateAccountDto): { account: Account } {
    const updatedDb = [...this.db];
    const accounts = updatedDb[accountDto.customerIndex]['accounts'];
    const accountIndex = accounts.findIndex(
      (account: Account) => account.id === accountDto.accountId,
    );

    accounts[accountIndex] = {
      ...accounts[accountIndex],
      type: accountDto.type,
    };

    this.db = updatedDb;

    return {
      account: updatedDb[accountDto.customerIndex]['accounts'][accountIndex],
    };
  }

  delete(accountId: string, customerIndex: number) {
    const updatedDb = [...this.db];
    const accountsUpdated = updatedDb[customerIndex]['accounts'].filter(
      (account: Account) => account.id !== accountId,
    );
    updatedDb[customerIndex]['accounts'] = accountsUpdated;

    this.db = updatedDb;

    return { message: 'Account deleted successfully' };
  }

  getIndex = (accountId: string, customerIndex: number): number =>
    this.db[customerIndex]['accounts'].findIndex(
      (account: Account) => account.id === accountId,
    );
}
