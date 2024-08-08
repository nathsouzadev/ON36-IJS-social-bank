import { Injectable } from '@nestjs/common';
import { AccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountsRepository } from './repository/accounts.repository';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly cardsService: CardsService,
  ) {}

  create = (createAccountDto: AccountDto): { account: Account } => {
    const { account } = this.accountsRepository.create(createAccountDto);
    const accountIndex = this.accountsRepository.getIndex(
      account.id,
      createAccountDto.customerIndex,
    );
    const { card } = this.cardsService.create({
      accountId: account.id,
      accountIndex,
      customerId: createAccountDto.customerId,
      customerIndex: createAccountDto.customerIndex,
    });

    return {
      account: {
        ...account,
        card,
      },
    };
  };

  update = (accountDto: UpdateAccountDto): { account: Account } =>
    this.accountsRepository.update(accountDto);

  delete = (accountId: string, customerIndex: number): { message: string } =>
    this.accountsRepository.delete(accountId, customerIndex);
}
