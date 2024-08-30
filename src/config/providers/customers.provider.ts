import { ORMCustomerRepository } from '../../resources/customer/repository/typeorm/ormCustomer.repository';
import { CustomerRepository } from '../../resources/customer/repository/customer.repository';
import { CustomerService } from '../../resources/customer/service/customer.service';
import { accountsProvider } from './accounts.provider';
import { peopleProviders } from './people.provider';
import { purchaseProvider } from './purchase.provider';

export const customersProvider = [
  CustomerService,
  {
    provide: CustomerRepository,
    useClass: ORMCustomerRepository,
  },
  ...accountsProvider,
  ...peopleProviders,
  ...purchaseProvider
];
