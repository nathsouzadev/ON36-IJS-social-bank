import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './repository/accounts.repository';
import { randomUUID } from 'crypto';
import { AccountType } from './dto/create-account.dto';
import { CardsService } from '../cards/cards.service';

describe('AccountsService', () => {
  let service: AccountsService;
  let mockAccountsRepository: AccountsRepository;
  let mockCardsService: CardsService;

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
            getIndex: jest.fn(),
          },
        },
        {
          provide: CardsService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    mockAccountsRepository = module.get<AccountsRepository>(AccountsRepository);
    mockCardsService = module.get<CardsService>(CardsService);
  });

  it('should be create savings account', () => {
    const mockAccountDto = {
      customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      customerIndex: 1,
      balance: 1000,
      type: AccountType.SAVINGS,
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
        type: 'savings',
        balance: 1000,
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      },
    });
  });

  it('should be create current account', () => {
    const mockCustomerId = '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4';
    const mockAccountId = randomUUID();

    const mockAccountDto = {
      customerId: mockCustomerId,
      customerIndex: 1,
      balance: 1000,
      type: AccountType.CURRENT,
    };

    jest.spyOn(mockAccountsRepository, 'create').mockReturnValue({
      account: {
        id: mockAccountId,
        overdraftLimit: 1000,
        interestRate: 0.02,
        ...mockAccountDto,
      },
    });
    jest.spyOn(mockAccountsRepository, 'getIndex').mockReturnValue(0);
    jest.spyOn(mockCardsService, 'create').mockReturnValue({
      card: {
        id: randomUUID(),
        customerId: mockCustomerId,
        accountId: mockAccountId,
        limit: 500,
        number: '4242505042425050',
        cvv: '123',
        expirationDate: '12/30',
      },
    });

    const response = service.create(mockAccountDto);
    expect(mockAccountsRepository.create).toHaveBeenCalledWith(mockAccountDto);
    expect(mockAccountsRepository.getIndex).toHaveBeenCalledWith(
      mockAccountId,
      1,
    );
    expect(mockCardsService.create).toHaveBeenCalledWith({
      customerId: mockCustomerId,
      customerIndex: 1,
      accountId: mockAccountId,
      accountIndex: 0,
    });
    expect(response).toMatchObject({
      account: {
        id: expect.any(String),
        type: 'current',
        balance: 1000,
        customerId: mockCustomerId,
        card: {
          id: expect.any(String),
          accountId: mockAccountId,
          customerId: mockCustomerId,
          number: expect.any(String),
          cvv: expect.any(String),
          expirationDate: expect.any(String),
          limit: 500,
        },
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
