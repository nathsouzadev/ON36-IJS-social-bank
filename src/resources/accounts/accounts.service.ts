import { Injectable } from '@nestjs/common';
import { AccountDto } from './dto/create-account.dto';
import { database } from '../../config/db/db';
import { Account } from './entities/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { OperationModel } from './models/operation.model';

@Injectable()
export class AccountsService {
  db = database;

  get = (customerIndex: number, accountId: string): Account =>
    this.db[customerIndex]['accounts'].find(
      (account: Account) => account.id === accountId,
    );

  create = (createAccountDto: AccountDto): { account: Account } => {
    const updatedDb = [...this.db];
    const account = new Account(createAccountDto);
    updatedDb[createAccountDto.customerIndex]['accounts'].push(account);
    this.db = updatedDb;

    return { account };
  };

  update = (accountDto: UpdateAccountDto): { account: Account } => {
    const updatedDb = [...this.db];
    const accounts = updatedDb[accountDto.customerIndex]['accounts'];
    const accountIndex = accounts.findIndex(
      (account: Account) => account.id === accountDto.accountId,
    );

    accounts[accountIndex] = {
      ...accounts[accountIndex],
      type: accountDto.type ?? accounts[accountIndex].type,
      balance: accountDto.balance ?? accounts[accountIndex].balance,
    };

    this.db = updatedDb;

    return {
      account: updatedDb[accountDto.customerIndex]['accounts'][accountIndex],
    };
  };

  delete = (accountId: string, customerIndex: number) => {
    const updatedDb = [...this.db];
    const accountsUpdated = updatedDb[customerIndex]['accounts'].filter(
      (account: Account) => account.id !== accountId,
    );
    updatedDb[customerIndex]['accounts'] = accountsUpdated;

    this.db = updatedDb;

    return { message: 'Account deleted successfully' };
  };

  validateOverdraft = (account: Account, amount: number): void => {
    if (account.balance - amount < -account.overdraftLimit) {
      throw new Error('Insufficient funds');
    }
  };

  deposit = (data: OperationModel): { account: Account } => {
    const { accountId, customerIndex, amount } = data;
    
    const account = this.get(customerIndex, accountId);
    this.validateOverdraft(account, amount);
    account.balance += amount;

    return this.update({
      accountId,
      customerIndex,
      balance: account.balance,
    });
  };

  withdraw = (data: OperationModel): { account: Account } => {
    const { accountId, customerIndex, amount } = data;
    
    const account = this.get(customerIndex, accountId);
    this.validateOverdraft(account, amount);
    account.balance -= amount;

    return this.update({
      accountId,
      customerIndex,
      balance: account.balance,
    });
  };
}
