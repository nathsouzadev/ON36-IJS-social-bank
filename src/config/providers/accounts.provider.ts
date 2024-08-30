import { AccountRepository } from '../../resources/accounts/repository/account.repository';
import { AccountsService } from '../../resources/accounts/accounts.service';
import { ORMAccountsRepository } from '../../resources/accounts/repository/typeorm/ormAccounts.repository';
import { cardsProvider } from './cards.provider';
import { purchaseProvider } from './purchase.provider';

export const accountsProvider = [
  AccountsService,
  {
    provide: AccountRepository,
    useClass: ORMAccountsRepository,
  },
  ...cardsProvider,
  ...purchaseProvider
];
