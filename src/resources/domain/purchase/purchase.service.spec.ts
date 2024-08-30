import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import { PurchaseRepository } from './repository/purchase.repository';
import { randomUUID } from 'crypto';
import { Purchase } from '../../config/db/entities/purchase.entity';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let mockPurchaseRepository: PurchaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseService,
        {
          provide: PurchaseRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
    mockPurchaseRepository = module.get<PurchaseRepository>(PurchaseRepository);
  });

  it('should create a purchase', async () => {
    const mockPurchaseDto = {
      amount: 100,
      cardId: randomUUID(),
      cnpj: '12345678901234',
    };
    const mockPurchase = {
      id: randomUUID(),
      ...mockPurchaseDto,
    } as Purchase;

    jest
      .spyOn(mockPurchaseRepository, 'create')
      .mockImplementation(() => Promise.resolve(mockPurchase));

    const response = await service.create(mockPurchaseDto);
    expect(mockPurchaseRepository.create).toHaveBeenCalledWith(mockPurchaseDto);
    expect(response).toMatchObject(mockPurchase);
  });
});
