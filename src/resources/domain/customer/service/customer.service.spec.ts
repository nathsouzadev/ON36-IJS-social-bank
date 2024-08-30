import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { AccountsService } from '../../../resources/accounts/accounts.service';
import { randomUUID } from 'crypto';
import { PeopleService } from '../../../resources/people/people.service';
import { CustomerRepository } from '../repository/customer.repository';
import { Customer } from '../../../config/db/entities/customer.entity';
import { NotFoundException } from '@nestjs/common';
import { Account } from '../../../config/db/entities/account.entity';
import { AccountType } from '../../../resources/accounts/dto/create-account.dto';

describe('CustomerService', () => {
  let service: CustomerService;
  let mockAccountsService: AccountsService;
  let mockCustomerRepository: CustomerRepository;
  let mockPeopleService: PeopleService;

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
        {
          provide: CustomerRepository,
          useValue: {
            create: jest.fn(),
            get: jest.fn(),
          },
        },
        {
          provide: PeopleService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    mockAccountsService = module.get<AccountsService>(AccountsService);
    mockCustomerRepository = module.get<CustomerRepository>(CustomerRepository);
    mockPeopleService = module.get<PeopleService>(PeopleService);
  });

  it('should be create a customer', async () => {
    const mockPeopleId = randomUUID();
    const mockManagerId = randomUUID();
    const mockCustomerDto = {
      name: 'Mary Jackson',
      email: 'may@idiomaparatodos.com.br',
      city: 'Hampton',
      phoneNumber: '5511880881234',
      cpf: '12345678901',
      birthdate: '1921-04-09',
      managerId: mockManagerId,
    };

    const mockPeople = {
      id: mockPeopleId,
      ...mockCustomerDto,
    };
    const mockCustomer = {
      id: randomUUID(),
      peopleId: mockPeopleId,
      managerId: mockManagerId,
    } as Customer;

    jest
      .spyOn(mockPeopleService, 'create')
      .mockImplementation(() => Promise.resolve(mockPeople));
    jest
      .spyOn(mockCustomerRepository, 'create')
      .mockImplementation(() => Promise.resolve(mockCustomer));

    const response = await service.create(mockCustomerDto);
    expect(mockPeopleService.create).toHaveBeenCalledWith(mockCustomerDto);
    expect(mockCustomerRepository.create).toHaveBeenCalledWith(mockPeopleId);
    expect(response).toMatchObject({
      id: expect.any(String),
      peopleId: mockPeopleId,
      managerId: mockManagerId,
    });
  });

  it('should be get a customer', async () => {
    const mockCustomerId = randomUUID();
    const mockCustomer = {
      id: mockCustomerId,
      peopleId: randomUUID(),
      managerId: randomUUID(),
    } as Customer;

    jest
      .spyOn(mockCustomerRepository, 'get')
      .mockImplementation(() => Promise.resolve(mockCustomer));

    const response = await service.get(mockCustomerId);
    expect(mockCustomerRepository.get).toHaveBeenCalledWith(mockCustomerId);
    expect(response).toMatchObject(mockCustomer);
  });

  it('should be validate a customer', async () => {
    const mockCustomerId = randomUUID();
    const mockCustomer = {
      id: mockCustomerId,
      peopleId: randomUUID(),
      managerId: randomUUID(),
    } as Customer;

    jest
      .spyOn(mockCustomerRepository, 'get')
      .mockImplementation(() => Promise.resolve(mockCustomer));

    const response = await service.validateCustomer(mockCustomerId);
    expect(mockCustomerRepository.get).toHaveBeenCalledWith(mockCustomerId);
    expect(response).toBeUndefined();
  });

  it('should be throw error if customer not found', async () => {
    const mockCustomerId = randomUUID();
    jest
      .spyOn(mockCustomerRepository, 'get')
      .mockImplementation(() => Promise.resolve(null));

    expect(service.validateCustomer(mockCustomerId)).rejects.toThrow(
      new NotFoundException('Customer not found'),
    );
  });

  it('should be create an account', async () => {
    const mockCustomerId = randomUUID();
    const mockAccountDto = {
      balance: 1000,
      customerId: mockCustomerId,
      type: AccountType.SAVINGS,
    };
    const mockAccount = {
      id: randomUUID(),
      active: true,
      overdraftLimit: 0,
      interestRate: 0.02,
      ...mockAccountDto,
    } as Account;

    jest
      .spyOn(service, 'validateCustomer')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(mockAccountsService, 'create')
      .mockImplementation(() => Promise.resolve(mockAccount));

    const response = await service.createAccount(mockAccountDto);
    expect(service.validateCustomer).toHaveBeenCalledWith(mockCustomerId);
    expect(mockAccountsService.create).toHaveBeenCalledWith(mockAccountDto);
    expect(response).toMatchObject(mockAccount);
  });

  it('should be update an account', async () => {
    const mockAccountDto = {
      accountId: randomUUID(),
      type: AccountType.SAVINGS,
    };

    jest
      .spyOn(service, 'validateCustomer')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(mockAccountsService, 'update')
      .mockImplementation(() =>
        Promise.resolve({ message: 'Account updated successfully' }),
      );

    const response = await service.updateAccount(mockAccountDto);
    expect(mockAccountsService.update).toHaveBeenCalledWith(mockAccountDto);
    expect(response).toMatchObject({ message: 'Account updated successfully' });
  });

  it('should be delete an account', async () => {
    const mockAccountId = randomUUID();
    const mockCustomerId = randomUUID();

    jest
      .spyOn(service, 'validateCustomer')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(mockAccountsService, 'delete')
      .mockImplementation(() =>
        Promise.resolve({ message: 'Account deleted successfully' }),
      );

    const response = await service.deleteAccount(mockAccountId, mockCustomerId);
    expect(mockAccountsService.delete).toHaveBeenCalledWith(mockAccountId);
    expect(response).toMatchObject({ message: 'Account deleted successfully' });
  });
});
