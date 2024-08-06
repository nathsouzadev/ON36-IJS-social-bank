import { CustomerRepository } from '../../resources/customer/repository/customer.repository';
import { CustomerService } from '../../resources/customer/service/customer.service';
import { accountsProvider } from './accounts.provider';

export const customersProvider = [
  CustomerService,
  CustomerRepository,
  ...accountsProvider,
];
