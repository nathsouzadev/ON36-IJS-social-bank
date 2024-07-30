import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { AccountsService } from '../../../resources/accounts/accounts.service';
import { CurrentAccountService } from '../../../resources/accounts/current-account.service';
import { SavingsAccountService } from '../../../resources/accounts/savings-account.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        AccountsService,
        SavingsAccountService,
        CurrentAccountService,
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
