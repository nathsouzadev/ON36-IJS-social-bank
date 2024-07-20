import { Test, TestingModule } from '@nestjs/testing';
import { ManagerService } from './manager.service';
import { CustomerService } from '../../../resources/customer/service/customer.service';
import { AccountsService } from '../../../resources/accounts/accounts.service';

describe('ManagerService', () => {
  let service: ManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerService, CustomerService, AccountsService],
    }).compile();

    service = module.get<ManagerService>(ManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
