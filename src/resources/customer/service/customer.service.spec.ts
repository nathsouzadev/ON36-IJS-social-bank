import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { AccountsService } from '../../../resources/accounts/accounts.service';
import { randomUUID } from 'crypto';

describe('CustomerService', () => {
  let service: CustomerService;
  let mockAccountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: AccountsService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    mockAccountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be create a customer', () => {
    const mockCustomerDto = {
      name: 'Mary Jackson',
      email: 'may@idiomaparatodos.com.br',
      city: 'Hampton',
      phoneNumber: '5511880881234',
      cpf: '12345678901',
      birthdate: '1921-04-09',
      managerId: randomUUID(),
    };

    const response = service.create(mockCustomerDto);
    expect(response).toMatchObject({
      customer: {
        id: expect.any(String),
        accounts: [],
        people: {
          id: expect.any(String),
          name: 'Mary Jackson',
          email: 'may@idiomaparatodos.com.br',
          city: 'Hampton',
          phoneNumber: '5511880881234',
          cpf: '12345678901',
          birthdate: '1921-04-09',
        },
        managerId: expect.any(String),
      },
    });
  });

  it('should be get a customer', () => {
    const mockCustomerId = '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4';
    const response = service.get(mockCustomerId);
    expect(response).toMatchObject({
      customer: {
        id: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
        accounts: [
          {
            id: 'ac8eede5-80d6-463a-8256-09c41dab5124',
            customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
            balance: 1000,
            type: 'current',
            interestRate: 0.02,
            overdraftLimit: 1000,
          },
        ],
        people: {
          id: '26e5f43c-bb42-4cf2-968b-56d32e049c56',
          name: 'Grace Hooper',
          email: 'grace@idiomaparatodos.com.br',
          city: 'Londres',
          phoneNumber: '+5511123456789',
          cpf: '12345678900',
          birthdate: '1815-12-10',
        },
        managerId: '76a2237f-1ddc-4aa3-9db7-66f7518b8f28',
      },
    });
  });

  it('should be return a customer not found', () => {
    const mockCustomerId = randomUUID();
    const response = service.get(mockCustomerId);
    expect(response).toMatchObject({
      customer: undefined,
    });
  });

  it('should be create a customer account', () => {
    const mockAccountDto = {
      customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      customerIndex: 1,
      balance: 1000,
      type: 'current',
    };

    jest.spyOn(mockAccountsService, 'create').mockReturnValue({
      account: {
        id: randomUUID(),
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
        balance: 1000,
        type: 'current',
        interestRate: 0.02,
        overdraftLimit: 1000,
      },
    });

    const response = service.createAccount(mockAccountDto);
    expect(mockAccountsService.create).toHaveBeenCalledWith(mockAccountDto);
    expect(response).toMatchObject({
      account: {
        id: expect.any(String),
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
        balance: 1000,
        type: 'current',
        interestRate: 0.02,
        overdraftLimit: 1000,
      },
    });
  });

  it('should be update a customer account', () => {
    const mockUpdateAccountDto = {
      accountId: 'ac8eede5-80d6-463a-8256-09c41dab5124',
      customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      customerIndex: 1,
      balance: 1000,
      type: 'current',
    };

    jest.spyOn(mockAccountsService, 'update').mockReturnValue({
      account: {
        id: 'ac8eede5-80d6-463a-8256-09c41dab5124',
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
        balance: 1000,
        type: 'current',
        interestRate: 0.02,
        overdraftLimit: 1000,
      },
    });

    const response = service.updateAccount(mockUpdateAccountDto);
    expect(mockAccountsService.update).toHaveBeenCalledWith(
      mockUpdateAccountDto,
    );
    expect(response).toMatchObject({
      account: {
        id: expect.any(String),
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
        balance: 1000,
        type: 'current',
        interestRate: 0.02,
        overdraftLimit: 1000,
      },
    });
  });

  it('should be delete a customer account', () => {
    const mockCustomerId = '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4';
    const mockAccountId = randomUUID();

    jest.spyOn(mockAccountsService, 'delete').mockReturnValue({
      message: 'Account deleted successfully',
    });

    const response = service.deleteAccount(mockAccountId, mockCustomerId);
    expect(mockAccountsService.delete).toHaveBeenCalledWith(mockAccountId, 1);
    expect(response).toMatchObject({
      response: {
        message: 'Account deleted successfully',
      },
    });
  });
});
