import { Test, TestingModule } from '@nestjs/testing';
import { CardsRepository } from './cards.repository';

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
    expect(response).toMatchObject({
      card: {
        id: expect.any(String),
        customerId: expect.any(String),
        accountId: expect.any(String),
        limit: 500,
        number: '4242505042425050',
        cvv: '123',
        expirationDate: '12/30',
      },
    });
  });
});
  