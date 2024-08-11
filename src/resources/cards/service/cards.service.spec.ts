import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { CardsRepository } from '../repository/cards.repository';
import { randomUUID } from 'crypto';

describe('CardsService', () => {
  let service: CardsService;
  let mockCardsRepository: CardsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: CardsRepository,
          useValue: {
            create: jest.fn(),
            get: jest.fn(),
            purchase: jest.fn(),
          },
        },
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
      customerIndex: 1,
    };
    jest.spyOn(mockCardsRepository, 'create').mockReturnValue({
      card: {
        id: randomUUID(),
        customerId: mockCustomerId,
        accountId: mockAccountId,
        limit: 500,
        number: '4242505042425050',
        cvv: '123',
        expirationDate: '12/30',
        purchases: [],
      },
    });

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
      },
    });
  });

  it('should be create a card purchase', () => {
    const mockCardId = '6641d6aa-dfe0-46ff-a803-721a3f1aae9e';
    const mockNumber = '4242505042425050';
    const mockCvv = '123';
    const mockExpirationDate = '12/30';
    const mockCnpj = '18141282000102';

    jest.spyOn(mockCardsRepository, 'get').mockReturnValue({
      card: {
        id: mockCardId,
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
        accountId: 'ac8eede5-80d6-463a-8256-09c41dab5124',
        limit: 500,
        number: '4242505042425050',
        cvv: '123',
        expirationDate: '12/30',
        purchases: [],
      },
    });
    jest.spyOn(mockCardsRepository, 'purchase').mockReturnValue({
      purchase: {
        id: randomUUID(),
        amount: 100,
        cardId: mockCardId,
        cnpj: mockCnpj,
        created_at: new Date().toISOString(),
      },
    });

    const response = service.purchase({
      cardId: mockCardId,
      amount: 100,
      cnpj: mockCnpj,
      number: mockNumber,
      cvv: mockCvv,
      expirationDate: mockExpirationDate,
    });
    expect(mockCardsRepository.get).toHaveBeenCalledWith(mockCardId);
    expect(mockCardsRepository.purchase).toHaveBeenCalledWith({
      cardId: mockCardId,
      amount: 100,
      cnpj: mockCnpj,
    });
    expect(response).toMatchObject({
      purchase: {
        id: expect.any(String),
        amount: 100,
        cardId: mockCardId,
        cnpj: mockCnpj,
        created_at: expect.any(String),
      },
    });
  });

  it('should be throw error if card has wrong data', () => {
    const mockCardId = '6641d6aa-dfe0-46ff-a803-721a3f1aae9e';
    const mockNumber = '0000000000000000';
    const mockCvv = '000';
    const mockExpirationDate = '12/20';
    const mockCnpj = '18141282000102';

    jest.spyOn(mockCardsRepository, 'get').mockReturnValue({
      card: {
        id: mockCardId,
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
        accountId: 'ac8eede5-80d6-463a-8256-09c41dab5124',
        limit: 500,
        number: '4242505042425050',
        cvv: '123',
        expirationDate: '12/30',
        purchases: [],
      },
    });

    expect(() => {
      service.purchase({
        cardId: mockCardId,
        amount: 100,
        cnpj: mockCnpj,
        number: mockNumber,
        cvv: mockCvv,
        expirationDate: mockExpirationDate,
      });
    }).toThrowError('Invalid card data');
  });

  it('should be throw error if card no have limit available', () => {
    const mockCardId = '6641d6aa-dfe0-46ff-a803-721a3f1aae9e';
    const mockNumber = '4242505042425050';
    const mockCvv = '123';
    const mockExpirationDate = '12/30';
    const mockCnpj = '18141282000102';

    jest.spyOn(mockCardsRepository, 'get').mockReturnValue({
      card: {
        id: mockCardId,
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
        accountId: 'ac8eede5-80d6-463a-8256-09c41dab5124',
        limit: 500,
        number: '4242505042425050',
        cvv: '123',
        expirationDate: '12/30',
        purchases: [],
      },
    });

    expect(() => {
      service.purchase({
        cardId: mockCardId,
        amount: 600,
        cnpj: mockCnpj,
        number: mockNumber,
        cvv: mockCvv,
        expirationDate: mockExpirationDate,
      });
    }).toThrowError('Insuficient founds');
  });
});
