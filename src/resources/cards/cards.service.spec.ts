import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { CardsRepository } from './repository/cards.repository';
import { randomUUID } from 'crypto';

describe('CardsService', () => {
  let service: CardsService;
  let mockCardsRepository: CardsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: CardsRepository,
          useValue: {
            create: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
    mockCardsRepository = module.get<CardsRepository>(CardsRepository);
  });

  it('should be creae a card', () => {
    const mockAccountId = 'ac8eede5-80d6-463a-8256-09c41dab5124';
    const mockCustomerId = '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4';
    
    const mockCreateCardDto = {
      accountId: mockAccountId,
      accountIndex: 0,
      customerId: mockCustomerId,
      customerIndex: 1
    }
    jest.spyOn(mockCardsRepository, 'create').mockReturnValue({
      card: {
        id: randomUUID(),
        customerId: mockCustomerId,
        accountId: mockAccountId,
        limit: 500,
        number: '4242505042425050',
        cvv: '123',
        expirationDate: '12/30',
      }
    })

    const response = service.create(mockCreateCardDto);
    expect(mockCardsRepository.create).toHaveBeenCalledWith(mockCreateCardDto);
    expect(response).toMatchObject({
      card: {
        id: expect.any(String),
        customerId: mockCustomerId,
        accountId: mockAccountId,
        limit: 500,
        number: '4242505042425050',
        cvv: '123',
        expirationDate: '12/30',
      }
    })
  });
});
