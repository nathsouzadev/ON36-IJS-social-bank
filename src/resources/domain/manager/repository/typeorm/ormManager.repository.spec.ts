import { Test, TestingModule } from '@nestjs/testing';
import { ORMManagerRepository } from './ormManager.repository';
import { randomUUID } from 'crypto';
import { Manager } from '../../,,/../../../config/db/entities/manager.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ORMManagerRepository', () => {
  let repository: ORMManagerRepository;
  let mockRepository: Repository<Manager>;

  const MANAGER_REPOSITORY_TOKEN = getRepositoryToken(Manager);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ORMManagerRepository,
        {
          provide: MANAGER_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ORMManagerRepository>(ORMManagerRepository);
    mockRepository = module.get<Repository<Manager>>(MANAGER_REPOSITORY_TOKEN);
  });

  it('should be create a manager', async () => {
    const mockPeopleId = randomUUID();

    await repository.create(mockPeopleId);
    expect(mockRepository.save).toBeCalledWith({ peopleId: mockPeopleId });
  });

  it('should be get a manager', async () => {
    const mockId = randomUUID();

    await repository.get(mockId);
    expect(mockRepository.findOne).toBeCalledWith({ where: { id: mockId } });
  });
});
