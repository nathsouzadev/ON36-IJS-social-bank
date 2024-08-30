import { Injectable } from '@nestjs/common';
import { AccountDto, AccountType } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './repository/account.repository';
import { CardsService } from '../cards/service/cards.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly cardsService: CardsService,
  ) {}

  create = async (createAccountDto: AccountDto) => {
    const account = await this.accountRepository.create(createAccountDto);

    if (
      account.type === AccountType.CURRENT ||
      account.type === AccountType.COMPANY
    ) {
      await this.cardsService.create({
        accountId: account.id,
        customerId: createAccountDto.customerId,
      });
    }

    return account;
  };

  update = async (
    accountDto: UpdateAccountDto,
  ): Promise<{ message: string }> => {
    await this.accountRepository.update(accountDto.accountId, accountDto.type);
    return { message: `Account updated successfully` };
  };

  delete = async (accountId: string): Promise<{ message: string }> => {
    await this.accountRepository.delete(accountId);
    return { message: `Account deleted successfully` };
  };
}
