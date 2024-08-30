import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { CardsRepository } from '../repository/cards.repository';
import { randomUUID } from 'crypto';
import { Card } from '../../../config/db/entities/card.entity';
import { PurchaseService } from '../../../resources/purchase/purchase.service';
import { Purchase } from '../../../config/db/entities/purchase.entity';

describe('CardsService', () => {
  let service: CardsService;
  let mockCardsRepository: CardsRepository;
  let mockPurchaseService: PurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: CardsRepository,
          useValue: {
            create: jest.fn(),
            get: jest.fn(),
          },
        },
        {
          provide: PurchaseService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
    mockCardsRepository = module.get<CardsRepository>(CardsRepository);
    mockPurchaseService = module.get<PurchaseService>(PurchaseService);
  });

  it('should be creae a card', async () => {
    const mockAccountId = randomUUID();
    const mockCustomerId = randomUUID();

    const mockCreateCardDto = {
      accountId: mockAccountId,
      customerId: mockCustomerId,
    };

    const mockCard = {
      id: randomUUID(),
      customerId: mockCustomerId,
      accountId: mockAccountId,
      limit: 500,
      number: '4242505042425050',
      cvv: '123',
      expirationDate: '12/30',
    } as Card;
    jest
      .spyOn(mockCardsRepository, 'create')
      .mockImplementation(() => Promise.resolve(mockCard));

    const response = await service.create(mockCreateCardDto);
    expect(mockCardsRepository.create).toHaveBeenCalledWith(mockCreateCardDto);
    expect(response).toMatchObject({
      id: expect.any(String),
      customerId: mockCustomerId,
      accountId: mockAccountId,
      limit: 500,
      number: '4242505042425050',
      cvv: '123',
      expirationDate: '12/30',
    });
  });

  it('should be create a card purchase', async () => {
    const mockCardId = '6641d6aa-dfe0-46ff-a803-721a3f1aae9e';
    const mockNumber = '4242505042425050';
    const mockCvv = '123';
    const mockExpirationDate = '12/30';
    const mockCnpj = '18141282000102';

    const mockCard = {
      id: mockCardId,
      customerId: randomUUID(),
      accountId: randomUUID(),
      limit: 500,
      number: '4242505042425050',
      cvv: '123',
      expirationDate: '12/30',
    } as Card;
    const mockPurchase = {
      id: randomUUID(),
      amount: 100,
      cardId: mockCardId,
      cnpj: mockCnpj,
    } as Purchase;

    jest
      .spyOn(mockCardsRepository, 'get')
      .mockImplementation(() => Promise.resolve(mockCard));

    jest
      .spyOn(mockPurchaseService, 'create')
      .mockImplementation(() => Promise.resolve(mockPurchase));

    const response = await service.purchase({
      cardId: mockCardId,
      amount: 100,
      cnpj: mockCnpj,
      number: mockNumber,
      cvv: mockCvv,
      expirationDate: mockExpirationDate,
    });
    expect(mockCardsRepository.get).toHaveBeenCalledWith(mockCardId);
    expect(mockPurchaseService.create).toHaveBeenCalledWith({
      cardId: mockCardId,
      amount: 100,
      cnpj: mockCnpj,
    });
    expect(response).toMatchObject({
      id: expect.any(String),
      amount: 100,
      cardId: mockCardId,
      cnpj: mockCnpj,
    });
  });

  it('should be throw error if card has wrong data', async () => {
    const mockCardId = randomUUID();
    const mockNumber = '0000000000000000';
    const mockCvv = '000';
    const mockExpirationDate = '12/20';
    const mockCnpj = '18141282000102';

    const mockCard = {
      id: mockCardId,
      customerId: randomUUID(),
      accountId: randomUUID(),
      limit: 500,
      number: '4242505042425050',
      cvv: '123',
      expirationDate: '12/30',
    } as Card;

    jest
      .spyOn(mockCardsRepository, 'get')
      .mockImplementation(() => Promise.resolve(mockCard));

    expect(
      service.purchase({
        cardId: mockCardId,
        amount: 100,
        cnpj: mockCnpj,
        number: mockNumber,
        cvv: mockCvv,
        expirationDate: mockExpirationDate,
      }),
    ).rejects.toThrowError('Invalid card data');
  });

  it('should be throw error if card no have limit available', async () => {
    const mockCardId = '6641d6aa-dfe0-46ff-a803-721a3f1aae9e';
    const mockNumber = '4242505042425050';
    const mockCvv = '123';
    const mockExpirationDate = '12/30';
    const mockCnpj = '18141282000102';

    const mockCard = {
      id: mockCardId,
      customerId: randomUUID(),
      accountId: randomUUID(),
      limit: 500,
      number: '4242505042425050',
      cvv: '123',
      expirationDate: '12/30',
    } as Card;

    jest
      .spyOn(mockCardsRepository, 'get')
      .mockImplementation(() => Promise.resolve(mockCard));

    expect(
      service.purchase({
        cardId: mockCardId,
        amount: 600,
        cnpj: mockCnpj,
        number: mockNumber,
        cvv: mockCvv,
        expirationDate: mockExpirationDate,
      }),
    ).rejects.toThrowError('Insuficient founds');
  });
});
