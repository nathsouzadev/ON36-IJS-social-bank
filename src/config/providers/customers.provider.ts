import { CustomerService } from 'src/resources/customer/service/customer.service';
import { accountsProvider } from './accounts.provider';

export const customersProvider = [CustomerService, ...accountsProvider];
