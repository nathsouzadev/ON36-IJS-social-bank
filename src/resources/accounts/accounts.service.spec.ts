import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsService],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be create account', () => {
    const mockAccountDto = {
      customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      customerIndex: 1,
      balance: 1000,
      type: 'current',
    };

    const response = service.create(mockAccountDto);
    expect(response).toMatchObject({
      account: {
        id: expect.any(String),
        type: 'current',
        balance: 1000,
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      },
    });
  });

  it('should be update account', () => {
    const mockUpdateAccountDto = {
      accountId: 'ac8eede5-80d6-463a-8256-09c41dab5124',
      customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      customerIndex: 1,
      balance: 1000,
      type: 'current',
    };

    const response = service.update(mockUpdateAccountDto);
    expect(response).toMatchObject({
      account: {
        id: expect.any(String),
        type: 'current',
        balance: 1000,
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      },
    });
  });

  it('should be delete account', () => {
    const response = service.delete('ac8eede5-80d6-463a-8256-09c41dab5124', 1);
    expect(response).toMatchObject({
      message: 'Account deleted successfully',
    });
  });
});
