import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { AccountsService } from '../../../resources/accounts/accounts.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, AccountsService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
