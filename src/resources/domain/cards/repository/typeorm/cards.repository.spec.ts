import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { ORMCardsRepository } from './cards.repository';
import { Card } from '../../../../config/db/entities/card.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ormCardsRepository', () => {
  let repository: ORMCardsRepository;
  let mockRepository: Repository<Card>;

  const CARD_REPOSITORY_TOKEN = getRepositoryToken(Card);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ORMCardsRepository,
        {
          provide: CARD_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ORMCardsRepository>(ORMCardsRepository);
    mockRepository = module.get<Repository<Card>>(CARD_REPOSITORY_TOKEN);
  });

  it('should be create card', async () => {
    const mockAccountId = randomUUID();
    const mockCustomerId = randomUUID();

    await repository.create({
      accountId: mockAccountId,
      customerId: mockCustomerId,
    });
    expect(mockRepository.save).toBeCalledWith({
      accountId: mockAccountId,
      customerId: mockCustomerId,
    });
  });

  it('should be get card', async () => {
    const mockId = randomUUID();
    await repository.get(mockId);
    expect(mockRepository.findOne).toBeCalledWith({
      where: { id: mockId },
    });
  });
});
