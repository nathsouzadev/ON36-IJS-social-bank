import { Test, TestingModule } from '@nestjs/testing';
import { ManagerService } from './manager.service';
import { CustomerService } from '../../../resources/customer/service/customer.service';
import { randomUUID } from 'crypto';
import { AccountType } from '../../../resources/accounts/dto/create-account.dto';
import { ManagerRepository } from '../repository/manager.repository';
import { PeopleService } from '../../../resources/people/people.service';
import { Manager } from '../../../config/db/entities/manager.entity';
import { Customer } from '../../../config/db/entities/customer.entity';
import { NotFoundException } from '@nestjs/common';

describe('ManagerService', () => {
  let service: ManagerService;
  let mockCustomerService: CustomerService;
  let mockManagerRepository: ManagerRepository;
  let mockPeopleService: PeopleService;

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
          provide: ManagerRepository,
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

    service = module.get<ManagerService>(ManagerService);
    mockCustomerService = module.get<CustomerService>(CustomerService);
    mockManagerRepository = module.get<ManagerRepository>(ManagerRepository);
    mockPeopleService = module.get<PeopleService>(PeopleService);
  });

  it('should be create a manager', async () => {
    const mockCreateManagerDto = {
      name: 'Katherine Johnson',
      email: 'katherine@idiomaparatodos.com.br',
      city: 'White Sulphur',
      phoneNumber: '5511880881234',
      cpf: '12345678901',
      birthdate: '1918-08-26',
    };
    const mockPeopleId = randomUUID();

    const mockPeople = {
      id: mockPeopleId,
      ...mockCreateManagerDto,
    };
    const mockManager = {
      id: randomUUID(),
      peopleId: mockPeopleId,
    } as Manager;

    jest
      .spyOn(mockPeopleService, 'create')
      .mockImplementation(() => Promise.resolve(mockPeople));
    jest
      .spyOn(mockManagerRepository, 'create')
      .mockImplementation(() => Promise.resolve(mockManager));

    const response = await service.create(mockCreateManagerDto);
    expect(mockPeopleService.create).toHaveBeenCalledWith(mockCreateManagerDto);
    expect(mockManagerRepository.create).toHaveBeenCalledWith(mockPeopleId);
    expect(response).toMatchObject({
      id: expect.any(String),
      peopleId: mockPeopleId,
    });
  });

  it('should be validate a manager', async () => {
    const mockManagerId = randomUUID();
    const mockManager = {
      id: randomUUID(),
    } as Manager;
    jest
      .spyOn(mockManagerRepository, 'get')
      .mockImplementation(() => Promise.resolve(mockManager));

    const response = await service.validateManager(mockManagerId);
    expect(mockManagerRepository.get).toHaveBeenCalledWith(mockManagerId);
    expect(response).toBe(undefined);
  });

  it('should be throw error if manager not found', async () => {
    const mockManagerId = randomUUID();
    jest
      .spyOn(mockManagerRepository, 'get')
      .mockImplementation(() => Promise.resolve(null));

    expect(service.validateManager(mockManagerId)).rejects.toThrow(
      new NotFoundException('Manager not found'),
    );
  });

  it('should be create a customer', async () => {
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
    const mockCustomer = {
      id: mockCustomerId,
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
    } as Customer;

    jest
      .spyOn(service, 'validateManager')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(mockCustomerService, 'create')
      .mockImplementation(() => Promise.resolve(mockCustomer));

    const response = await service.createCustomer(
      mockManagerId,
      mockCustomerDto,
    );
    expect(service.validateManager).toHaveBeenCalledWith(mockManagerId);
    expect(mockCustomerService.create).toHaveBeenCalledWith(mockCustomerDto);
    expect(response).toMatchObject({
      id: expect.any(String),
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
    });
  });

  it('should be update a customer account', async () => {
    const mockManagerId = randomUUID();
    const mockAccountDto = {
      accountId: randomUUID(),
      type: AccountType.CURRENT,
    };
    jest
      .spyOn(service, 'validateManager')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(mockCustomerService, 'updateAccount')
      .mockImplementation(() =>
        Promise.resolve({ message: 'Account updated' }),
      );

    const response = await service.updateCustomerAccount(
      mockManagerId,
      mockAccountDto,
    );
    expect(service.validateManager).toHaveBeenCalledWith(mockManagerId);
    expect(mockCustomerService.updateAccount).toHaveBeenCalledWith(
      mockAccountDto,
    );
    expect(response).toMatchObject({ message: 'Account updated' });
  });

  it('should be delete a customer account', async () => {
    const mockManagerId = randomUUID();
    const mockCustomerId = randomUUID();
    const mockAccountId = randomUUID();
    jest
      .spyOn(service, 'validateManager')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(mockCustomerService, 'deleteAccount')
      .mockImplementation(() =>
        Promise.resolve({ message: 'Account deleted' }),
      );

    const response = await service.deleteCustomerAccount(
      mockManagerId,
      mockCustomerId,
      mockAccountId,
    );
    expect(service.validateManager).toHaveBeenCalledWith(mockManagerId);
    expect(mockCustomerService.deleteAccount).toHaveBeenCalledWith(
      mockAccountId,
      mockCustomerId,
    );
    expect(response).toMatchObject({ message: 'Account deleted' });
  });
});
