import { Injectable } from '@nestjs/common';
import { AccountDto } from '../../dto/create-account.dto';
import { AccountRepository } from '../account.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../../../config/db/entities/account.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ORMAccountsRepository implements AccountRepository {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  create = async (createAccountDto: AccountDto): Promise<Account> =>
    this.accountRepository.save({
      customerId: createAccountDto.customerId,
      type: createAccountDto.type,
      balance: createAccountDto.balance,
    });

  get = async (id: string): Promise<Account> =>
    this.accountRepository.findOne({ where: { id } });

  delete = async (id: string): Promise<UpdateResult> =>
    this.accountRepository.update(
      {
        id,
      },
      {
        active: false,
      },
    );

  update = async (id: string, type: string): Promise<UpdateResult> => {
    return this.accountRepository.update(
      {
        id,
      },
      {
        type,
      },
    );
  };
}
