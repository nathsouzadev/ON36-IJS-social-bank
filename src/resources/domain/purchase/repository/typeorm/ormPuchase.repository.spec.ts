import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ORMPurchaseRepository } from './ormPuchase.repository';
import { Purchase } from '../../../../config/db/entities/purchase.entity';

describe('ormPurchaseRepository', () => {
  let repository: ORMPurchaseRepository;
  let mockRepository: Repository<Purchase>;

  const PURCHASE_REPOSITORY_TOKEN = getRepositoryToken(Purchase);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ORMPurchaseRepository,
        {
          provide: PURCHASE_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ORMPurchaseRepository>(ORMPurchaseRepository);
    mockRepository = module.get<Repository<Purchase>>(
      PURCHASE_REPOSITORY_TOKEN,
    );
  });

  it('should be create purchase', async () => {
    const mockPurchaseDto = {
      amount: 100,
      cardId: randomUUID(),
      cnpj: '12345678901234',
    };
    await repository.create(mockPurchaseDto);
    expect(mockRepository.save).toBeCalledWith(mockPurchaseDto);
  });
});
