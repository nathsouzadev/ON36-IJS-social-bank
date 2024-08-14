import { Injectable } from '@nestjs/common';
import { AccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountsRepository } from './repository/accounts.repository';
import { CardsService } from '../cards/service/cards.service';
import { BrasilService } from '../brasil/brasil.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly cardsService: CardsService,
    private readonly brasilService: BrasilService,
  ) {}

  create = async (createAccountDto: AccountDto): Promise<{ account: Account }> => {
    const { account } = this.accountsRepository.create(createAccountDto);
    
    if (account.type === 'current' || account.type === 'company') {
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

      if (account.type === 'company') {
        const customer = this.accountsRepository.getCustomer(account.customerId)
        const cnpjData = await this.brasilService.partnerCnpj({
          cnpj: createAccountDto.cnpj,
          partner: customer.people.name,
        })

        return {
          account: {
            ...account,
            card,
            company: {
              ...cnpjData,
              address: cnpjData.cep,
              cnpj: createAccountDto.cnpj,
            },
          },
        };
      }
  
      return {
        account: {
          ...account,
          card,
        },
      };
    }

    return { account };
  };

  update = (accountDto: UpdateAccountDto): { account: Account } =>
    this.accountsRepository.update(accountDto);

  delete = (accountId: string, customerIndex: number): { message: string } =>
    this.accountsRepository.delete(accountId, customerIndex);
}
