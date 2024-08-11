import { Test, TestingModule } from '@nestjs/testing';
import { BrasilService } from './brasil.service';

describe('BrasilService', () => {
  let service: BrasilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrasilService],
    }).compile();

    service = module.get<BrasilService>(BrasilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
