import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { randomUUID } from 'crypto';
import { AccountType } from './dto/create-account.dto';
import { CardsService } from '../cards/service/cards.service';
import { BrasilService } from '../brasil/brasil.service';
import { AccountRepository } from './repository/account.repository';
import { Account } from '../../config/db/entities/account.entity';
import { Card } from '../../config/db/entities/card.entity';

describe('AccountsService', () => {
  let service: AccountsService;
  let mockAccountRepository: AccountRepository;
  let mockCardsService: CardsService;
  let mockBrasilService: BrasilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: AccountRepository,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: CardsService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: BrasilService,
          useValue: {
            partnerCnpj: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    mockAccountRepository = module.get<AccountRepository>(AccountRepository);
    mockCardsService = module.get<CardsService>(CardsService);
    mockBrasilService = module.get<BrasilService>(BrasilService);
  });

  it('should be create savings account', async () => {
    const mockCustomerId = randomUUID();
    const mockAccountDto = {
      customerId: mockCustomerId,
      customerIndex: 1,
      balance: 1000,
      type: AccountType.SAVINGS,
    };

    const mockAccount = {
      id: randomUUID(),
      customerId: mockCustomerId,
      balance: 1000,
      overdraftLimit: 0,
      interestRate: 0.02,
      type: AccountType.SAVINGS,
    } as Account;

    jest
      .spyOn(mockAccountRepository, 'create')
      .mockImplementation(() => Promise.resolve(mockAccount));

    const response = await service.create(mockAccountDto);
    expect(mockAccountRepository.create).toHaveBeenCalledWith(mockAccountDto);
    expect(response).toMatchObject({
      id: expect.any(String),
      type: 'savings',
      balance: 1000,
      customerId: mockCustomerId,
    });
  });

  it('should be create current account', async () => {
    const mockCustomerId = randomUUID();

    const mockAccountDto = {
      customerId: mockCustomerId,
      customerIndex: 1,
      balance: 1000,
      type: AccountType.CURRENT,
    };

    const mockAccount = {
      id: randomUUID(),
      customerId: mockCustomerId,
      balance: 1000,
      overdraftLimit: 1000,
      interestRate: 0,
      type: AccountType.CURRENT,
    } as Account;

    const mockCard = {
      id: randomUUID(),
      customerId: mockCustomerId,
      accountId: mockAccount.id,
      limit: 500,
      number: '4242505042425050',
      cvv: '123',
      expirationDate: '12/30',
    } as Card;

    jest
      .spyOn(mockAccountRepository, 'create')
      .mockImplementation(() => Promise.resolve(mockAccount));

    jest
      .spyOn(mockCardsService, 'create')
      .mockImplementation(() => Promise.resolve(mockCard));

    const response = await service.create(mockAccountDto);
    expect(mockAccountRepository.create).toHaveBeenCalledWith(mockAccountDto);
    expect(mockCardsService.create).toHaveBeenCalledWith({
      customerId: mockCustomerId,
      accountId: mockAccount.id,
    });
    expect(response).toMatchObject({
      id: expect.any(String),
      type: 'current',
      balance: 1000,
      customerId: mockCustomerId,
      overdraftLimit: 1000,
    });
  });

  // it('should be create company account', async () => {
  //   const mockCustomerId = '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4';
  //   const mockAccountId = randomUUID();

  //   const mockAccountDto = {
  //     customerId: mockCustomerId,
  //     customerIndex: 1,
  //     balance: 1000,
  //     type: AccountType.COMPANY,
  //     cnpj: '17895646000420',
  //   };

  //   jest.spyOn(mockAccountRepository, 'create').mockReturnValue({
  //     account: {
  //       id: mockAccountId,
  //       overdraftLimit: 1000,
  //       interestRate: 0.02,
  //       ...mockAccountDto,
  //     },
  //   });
  //   jest.spyOn(mockAccountRepository, 'getIndex').mockReturnValue(0);
  //   jest.spyOn(mockCardsService, 'create').mockReturnValue({
  //     card: {
  //       id: randomUUID(),
  //       customerId: mockCustomerId,
  //       accountId: mockAccountId,
  //       limit: 500,
  //       number: '4242505042425050',
  //       cvv: '123',
  //       expirationDate: '12/30',
  //       purchases: [],
  //     },
  //   });
  //   jest.spyOn(mockAccountRepository, 'getCustomer').mockReturnValue({
  //     id: mockCustomerId,
  //     accounts: [
  //       {
  //         id: mockAccountId,
  //         customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
  //         balance: 1000,
  //         type: AccountType.CURRENT,
  //         interestRate: 0.02,
  //         overdraftLimit: 1000,
  //         card: {
  //           id: randomUUID(),
  //           customerId: mockCustomerId,
  //           accountId: mockAccountId,
  //           limit: 500,
  //           number: '4242505042425050',
  //           cvv: '123',
  //           expirationDate: '12/30',
  //           purchases: [],
  //         },
  //       },
  //     ],
  //     people: {
  //       id: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
  //       name: 'Grace Hooper',
  //       email: 'grace@idiomaparatodos.com.br',
  //       city: 'Londres',
  //       phoneNumber: '+5511123456789',
  //       cpf: '12345678900',
  //       birthdate: '1815-12-10',
  //     },
  //     managerId: '76a2237f-1ddc-4aa3-9db7-66f7518b8f28',
  //   });

  //   jest.spyOn(mockBrasilService, 'partnerCnpj').mockImplementation(() =>
  //     Promise.resolve({
  //       cep: '70701000',
  //       partners: [
  //         {
  //           name: 'Dorothy Vaughan',
  //           type: 'Sócio-Administrador',
  //         },
  //       ],
  //       cnae: 'Desenvolvimento de programas de computador sob encomenda',
  //     }),
  //   );

  //   const response = await service.create(mockAccountDto);
  //   expect(mockAccountRepository.create).toHaveBeenCalledWith(mockAccountDto);
  //   expect(mockAccountRepository.getIndex).toHaveBeenCalledWith(
  //     mockAccountId,
  //     1,
  //   );
  //   expect(mockCardsService.create).toHaveBeenCalledWith({
  //     customerId: mockCustomerId,
  //     customerIndex: 1,
  //     accountId: mockAccountId,
  //     accountIndex: 0,
  //   });
  //   expect(mockAccountRepository.getCustomer).toHaveBeenCalledWith(
  //     mockCustomerId,
  //   );
  //   expect(mockBrasilService.partnerCnpj).toHaveBeenCalled();
  //   expect(response).toMatchObject({
  //     account: {
  //       id: expect.any(String),
  //       type: 'company',
  //       balance: 1000,
  //       customerId: mockCustomerId,
  //       card: {
  //         id: expect.any(String),
  //         accountId: mockAccountId,
  //         customerId: mockCustomerId,
  //         number: expect.any(String),
  //         cvv: expect.any(String),
  //         expirationDate: expect.any(String),
  //         limit: 500,
  //       },
  //       company: {
  //         cnpj: '17895646000420',
  //         address: '70701000',
  //         partners: [
  //           {
  //             name: 'Dorothy Vaughan',
  //             type: 'Sócio-Administrador',
  //           },
  //         ],
  //         cnae: 'Desenvolvimento de programas de computador sob encomenda',
  //       },
  //     },
  //   });
  // });

  it('should be update account', async () => {
    const mockAccountId = randomUUID();
    const mockType = AccountType.CURRENT;
    const mockUpdateAccountDto = {
      accountId: mockAccountId,
      customerId: randomUUID(),
      customerIndex: 1,
      balance: 1000,
      type: mockType,
    };

    const response = await service.update(mockUpdateAccountDto);
    expect(mockAccountRepository.update).toHaveBeenCalledWith(
      mockAccountId,
      mockType,
    );
    expect(response).toMatchObject({
      message: 'Account updated successfully',
    });
  });

  it('should be delete account', async () => {
    const mockAccountId = randomUUID();
    const response = await service.delete(mockAccountId);
    expect(mockAccountRepository.delete).toHaveBeenCalledWith(mockAccountId);
    expect(response).toMatchObject({
      message: 'Account deleted successfully',
    });
  });
});
