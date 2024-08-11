import { Test, TestingModule } from '@nestjs/testing';
import { AccountsRepository } from './accounts.repository';
import { AccountType } from '../dto/create-account.dto';
import { randomUUID } from 'crypto';

describe('AccountsRepository', () => {
  let repository: AccountsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsRepository],
    }).compile();

    repository = module.get<AccountsRepository>(AccountsRepository);
  });

  it('should be create account', () => {
    const mockAccountDto = {
      customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      customerIndex: 1,
      balance: 1000,
      type: AccountType.CURRENT,
    };

    const response = repository.create(mockAccountDto);
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
      type: AccountType.CURRENT,
    };

    const response = repository.update(mockUpdateAccountDto);
    expect(response).toMatchObject({
      account: {
        id: expect.any(String),
        type: 'current',
        balance: 1000,
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      },
    });
  });

  it('should be get account index', () => {
    const response = repository.getIndex(
      'ac8eede5-80d6-463a-8256-09c41dab5124',
      1,
    );
    expect(response).toBe(0);
  });

  it('should be return -1 if account not exists', () => {
    const response = repository.getIndex(randomUUID(), 1);
    expect(response).toBe(-1);
  });

  it('should be delete account', () => {
    const response = repository.delete(
      'ac8eede5-80d6-463a-8256-09c41dab5124',
      1,
    );
    expect(response).toMatchObject({
      message: 'Account deleted successfully',
    });
  });
});
