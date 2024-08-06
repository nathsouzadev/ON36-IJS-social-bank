import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './repository/accounts.repository';
import { randomUUID } from 'crypto';
import { AccountType } from './dto/create-account.dto';

describe('AccountsService', () => {
  let service: AccountsService;
  let mockAccountsRepository: AccountsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: AccountsRepository,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    mockAccountsRepository = module.get<AccountsRepository>(AccountsRepository);
  });

  it('should be create account', () => {
    const mockAccountDto = {
      customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      customerIndex: 1,
      balance: 1000,
      type: AccountType.CURRENT,
    };

    jest.spyOn(mockAccountsRepository, 'create').mockReturnValue({
      account: {
        id: randomUUID(),
        overdraftLimit: 1000,
        interestRate: 0.02,
        ...mockAccountDto,
      },
    });

    const response = service.create(mockAccountDto);
    expect(mockAccountsRepository.create).toHaveBeenCalledWith(mockAccountDto);
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

    jest.spyOn(mockAccountsRepository, 'update').mockReturnValue({
      account: {
        id: 'ac8eede5-80d6-463a-8256-09c41dab5124',
        overdraftLimit: 1000,
        interestRate: 0.02,
        ...mockUpdateAccountDto,
      },
    });

    const response = service.update(mockUpdateAccountDto);
    expect(mockAccountsRepository.update).toHaveBeenCalledWith(
      mockUpdateAccountDto,
    );
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
    jest
      .spyOn(mockAccountsRepository, 'delete')
      .mockReturnValue({ message: 'Account deleted successfully' });

    const response = service.delete('ac8eede5-80d6-463a-8256-09c41dab5124', 1);
    expect(mockAccountsRepository.delete).toHaveBeenCalledWith(
      'ac8eede5-80d6-463a-8256-09c41dab5124',
      1,
    );
    expect(response).toMatchObject({
      message: 'Account deleted successfully',
    });
  });
});
