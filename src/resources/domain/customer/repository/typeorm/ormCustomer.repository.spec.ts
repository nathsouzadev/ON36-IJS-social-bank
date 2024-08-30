import { Test, TestingModule } from '@nestjs/testing';
import { ORMCustomerRepository } from './ormCustomer.repository';
import { randomUUID } from 'crypto';
import { Customer } from '../../../../config/db/entities/customer.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ormCustomerRepository', () => {
  let repository: ORMCustomerRepository;
  let mockRepository: Repository<Customer>;

  const CUSTOMER_REPOSITORY_TOKEN = getRepositoryToken(Customer);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ORMCustomerRepository,
        {
          provide: CUSTOMER_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ORMCustomerRepository>(ORMCustomerRepository);
    mockRepository = module.get<Repository<Customer>>(
      CUSTOMER_REPOSITORY_TOKEN,
    );
  });

  it('should be create a customer', () => {
    const mockCustomerId = randomUUID();

    repository.create(mockCustomerId);
    expect(mockRepository.save).toBeCalledWith({ peopleId: mockCustomerId });
  });

  it('should be get a customer', () => {
    const mockCustomerId = randomUUID();
    repository.get(mockCustomerId);
    expect(mockRepository.findOne).toBeCalledWith({
      where: { id: mockCustomerId },
    });
  });
});
