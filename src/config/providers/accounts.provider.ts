import { AccountsService } from '../../resources/accounts/accounts.service';
import { AccountsRepository } from '../../resources/accounts/repository/accounts.repository';

export const accountsProvider = [AccountsService, AccountsRepository];
