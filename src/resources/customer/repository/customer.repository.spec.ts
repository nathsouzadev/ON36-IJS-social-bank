import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRepository } from './customer.repository';
import { randomUUID } from 'crypto';

describe('CustomerService', () => {
  let repository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerRepository],
    }).compile();

    repository = module.get<CustomerRepository>(CustomerRepository);
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

    const response = repository.create(mockCustomerDto);
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
    const response = repository.get(mockCustomerId);
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
    const response = repository.get(mockCustomerId);
    expect(response).toMatchObject({
      customer: undefined,
    });
  });

  it('should be return a customer index', () => {
    [
      {
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
        index: 1,
      },
      {
        customerId: randomUUID(),
        index: -1,
      },
    ].forEach(({ customerId, index }) => {
      const response = repository.getIndex(customerId);
      expect(response).toBe(index);
    });
  });
});
