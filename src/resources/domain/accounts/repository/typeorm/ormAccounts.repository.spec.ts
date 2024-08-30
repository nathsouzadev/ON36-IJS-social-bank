import { Test, TestingModule } from '@nestjs/testing';
import { ORMAccountsRepository } from './ormAccounts.repository';
import { AccountType } from '../../dto/create-account.dto';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AccountsRepository', () => {
  let repository: ORMAccountsRepository;
  let mockRepository: Repository<Account>;

  const ACCOUNT_REPOSITORY_TOKEN = getRepositoryToken(Account);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ORMAccountsRepository,
        {
          provide: ACCOUNT_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ORMAccountsRepository>(ORMAccountsRepository);
    mockRepository = module.get<Repository<Account>>(ACCOUNT_REPOSITORY_TOKEN);
  });

  it('should be create account', async () => {
    const mockAccountDto = {
      customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      customerIndex: 1,
      balance: 1000,
      type: AccountType.CURRENT,
    };

    await repository.create(mockAccountDto);
    expect(mockRepository.save).toBeCalledWith({
      customerId: mockAccountDto.customerId,
      balance: mockAccountDto.balance,
      type: mockAccountDto.type,
    });
  });

  it('should be get account', async () => {
    const mockAccountId = randomUUID();
    await repository.get(mockAccountId);
    expect(mockRepository.findOne).toBeCalledWith({
      where: { id: mockAccountId },
    });
  });

  it('should be set active false', async () => {
    const mockAccountId = randomUUID();
    await repository.delete(mockAccountId);
    expect(mockRepository.update).toBeCalledWith(
      {
        id: mockAccountId,
      },
      {
        active: false,
      },
    );
  })

  it('should be update account type', async () => {
    const mockAccountId = randomUUID();
    const mockType = AccountType.CURRENT;
    await repository.update(mockAccountId, mockType);
    expect(mockRepository.update).toBeCalledWith(
      {
        id: mockAccountId,
      },
      {
        type: mockType,
      },
    );
  });
});
