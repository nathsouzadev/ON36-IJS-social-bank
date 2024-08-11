import { AccountsService } from '../../resources/accounts/accounts.service';
import { AccountsRepository } from '../../resources/accounts/repository/accounts.repository';
import { cardsProvider } from './cards.provider';

export const accountsProvider = [AccountsService, AccountsRepository, ...cardsProvider];
