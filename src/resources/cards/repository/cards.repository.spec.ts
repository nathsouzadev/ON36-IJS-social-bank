import { Test, TestingModule } from '@nestjs/testing';
import { CardsRepository } from './cards.repository';
import { randomUUID } from 'crypto';

describe('CardsRepository', () => {
  let repository: CardsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardsRepository],
    }).compile();

    repository = module.get<CardsRepository>(CardsRepository);
  });

  it('should be create card', () => {
    const response = repository.create({
      accountId: 'ac8eede5-80d6-463a-8256-09c41dab5124',
      accountIndex: 0,
      customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      customerIndex: 1
    });
    expect(response.card.number).toHaveLength(16);
    expect(response.card.cvv).toHaveLength(3);
    expect(response.card.expirationDate).toHaveLength(5);
    expect(response).toMatchObject({
      card: {
        id: expect.any(String),
        customerId: expect.any(String),
        accountId: expect.any(String),
        limit: 500,
        number: expect.any(String),
        cvv: expect.any(String),
        expirationDate: expect.any(String),
      },
    });
  });

  it('should be get card by id', () => {
    const response = repository.get('6641d6aa-dfe0-46ff-a803-721a3f1aae9e');
    expect(response).toMatchObject({
      card: {
        id: expect.any(String),
        customerId: expect.any(String),
        accountId: expect.any(String),
        limit: 500,
        number: expect.any(String),
        cvv: expect.any(String),
        expirationDate: expect.any(String),
      }
    });
  })

  it('should be rerurn undefined when card not exists', () => {
    const response = repository.get(randomUUID());
    expect(response).toMatchObject({ card: undefined });
  })

  it('should be create purchase', () => {
    const mockCardId = '6641d6aa-dfe0-46ff-a803-721a3f1aae9e';
    const response = repository.purchase({
      cardId: mockCardId,
      amount: 100,
      cnpj: '18141282000102',
    });
    expect(response).toMatchObject({
      purchase: {
        amount: 100,
        cardId: mockCardId,
        cnpj: '18141282000102',
        created_at: expect.any(String),
      }
    });
  });
});
  