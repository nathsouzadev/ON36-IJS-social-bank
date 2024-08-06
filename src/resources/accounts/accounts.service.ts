import { Injectable } from '@nestjs/common';
import { AccountDto } from './dto/create-account.dto';
import { database } from '../../config/db/db';
import { Account } from './entities/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountsRepository } from './repository/accounts.repository';

@Injectable()
export class AccountsService {
  db = database;

  constructor(private readonly accountsRepository: AccountsRepository) {}

  create = (createAccountDto: AccountDto): { account: Account } =>
    this.accountsRepository.create(createAccountDto);

  update = (accountDto: UpdateAccountDto): { account: Account } =>
    this.accountsRepository.update(accountDto);

  delete = (accountId: string, customerIndex: number): { message: string } =>
    this.accountsRepository.delete(accountId, customerIndex);
}
