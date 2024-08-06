import { Test, TestingModule } from '@nestjs/testing';
import { ManagerService } from './manager.service';
import { CustomerService } from '../../../resources/customer/service/customer.service';
import { AccountsService } from '../../../resources/accounts/accounts.service';
import { randomUUID } from 'crypto';

describe('ManagerService', () => {
  let service: ManagerService;
  let mockCustomerService: CustomerService;
  let mockAccountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManagerService,
        {
          provide: CustomerService,
          useValue: {
            create: jest.fn(),
            updateAccount: jest.fn(),
            deleteAccount: jest.fn(),
          },
        },
        {
          provide: AccountsService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ManagerService>(ManagerService);
    mockCustomerService = module.get<CustomerService>(CustomerService);
    mockAccountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be create a manager', () => {
    const mockCreateManagerDto = {
      name: 'Katherine Johnson',
      email: 'katherine@idiomaparatodos.com.br',
      city: 'White Sulphur',
      phoneNumber: '5511880881234',
      cpf: '12345678901',
      birthdate: '1918-08-26',
    };

    const response = service.create(mockCreateManagerDto);
    expect(response).toMatchObject({
      manager: {
        id: expect.any(String),
        customers: [],
        people: {
          id: expect.any(String),
          name: 'Katherine Johnson',
          email: 'katherine@idiomaparatodos.com.br',
          city: 'White Sulphur',
          phoneNumber: '5511880881234',
          cpf: '12345678901',
          birthdate: '1918-08-26',
        },
      },
    });
  });

  it('should be create a customer', () => {
    const mockManagerId = '76a2237f-1ddc-4aa3-9db7-66f7518b8f28';
    const mockCustomerDto = {
      name: 'Mary Jackson',
      email: 'may@idiomaparatodos.com.br',
      city: 'Hampton',
      phoneNumber: '5511880881234',
      cpf: '12345678901',
      birthdate: '1921-04-09',
      managerId: mockManagerId,
    };
    const mockCustomerId = randomUUID();

    jest.spyOn(mockCustomerService, 'create').mockReturnValue({
      customer: {
        id: mockCustomerId,
        accounts: [],
        people: {
          id: mockCustomerId,
          name: 'Mary Jackson',
          email: 'may@idiomaparatodos.com.br',
          city: 'Hampton',
          phoneNumber: '5511880881234',
          cpf: '12345678901',
          birthdate: '1921-04-09',
        },
        managerId: mockManagerId,
      },
    });

    const response = service.createCustomer(mockManagerId, mockCustomerDto);
    expect(mockCustomerService.create).toHaveBeenCalledWith(mockCustomerDto);
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
        managerId: mockManagerId,
      },
    });
  });

  it('should be update customer account', () => {
    const mockManagerId = '76a2237f-1ddc-4aa3-9db7-66f7518b8f28';
    const mockCustomerId = randomUUID();
    const mockAccountId = randomUUID();
    const mockUpdateAccountDto = {
      type: 'savings',
      accountId: mockAccountId,
    };

    jest.spyOn(mockCustomerService, 'updateAccount').mockReturnValue({
      account: {
        id: mockAccountId,
        customerId: mockCustomerId,
        balance: 1000,
        type: 'savings',
        interestRate: 0.02,
        overdraftLimit: 0,
      },
    });

    const response = service.updateCustomerAccount(
      mockManagerId,
      mockUpdateAccountDto,
    );
    expect(mockCustomerService.updateAccount).toHaveBeenCalledWith(
      mockUpdateAccountDto,
    );
    expect(response).toMatchObject({
      account: {
        id: expect.any(String),
        customerId: mockCustomerId,
        balance: 1000,
        type: 'savings',
        interestRate: 0.02,
        overdraftLimit: 0,
      },
    });
  });

  it('should be delete customer account', () => {
    const mockManagerId = '76a2237f-1ddc-4aa3-9db7-66f7518b8f28';
    const mockCustomerId = randomUUID();
    const mockAccountId = randomUUID();

    jest.spyOn<any, any>(mockCustomerService, 'deleteAccount').mockReturnValue({
      message: 'Account deleted successfully',
    });

    const response = service.deleteCustomerAccount(
      mockManagerId,
      mockCustomerId,
      mockAccountId,
    );
    expect(mockCustomerService.deleteAccount).toHaveBeenCalledWith(
      mockAccountId,
      mockCustomerId,
    );
    expect(response).toMatchObject({
      message: 'Account deleted successfully',
    });
  });
});
