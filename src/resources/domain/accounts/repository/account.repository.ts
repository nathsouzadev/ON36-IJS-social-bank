import { UpdateResult } from 'typeorm';
import { Account } from '../../../config/db/entities/account.entity';
import { AccountDto } from '../dto/create-account.dto';

export abstract class AccountRepository {
  abstract create(createAccountDto: AccountDto): Promise<Account>;

  abstract get(id: string): Promise<Account>;

  abstract delete(id: string): Promise<UpdateResult>;

  abstract update(id: string, type: string): Promise<UpdateResult>;
}
