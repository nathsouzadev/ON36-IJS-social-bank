import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { People } from '../../entities/person.entity';
import { Repository } from 'typeorm';
import { ORMPeopleRepository } from './ormPeople.repository';

describe('ormPeopleRepository', () => {
  let ormPeopleRepository: ORMPeopleRepository;
  let mockRepository: Repository<People>;

  const PEOPLE_REPOSITORY_TOKEN = getRepositoryToken(People);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ORMPeopleRepository,
        {
          provide: PEOPLE_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    ormPeopleRepository = module.get<ORMPeopleRepository>(ORMPeopleRepository);
    mockRepository = module.get<Repository<People>>(PEOPLE_REPOSITORY_TOKEN);
  });

  it('should be create people', async () => {
    const mockPeople = new People({
      name: 'Ada Lovelace',
      email: 'ada@idiomaparatodos.com.br',
      city: 'Londres',
      phoneNumber: '+5511123456789',
      cpf: '12345678900',
      birthdate: '1815-12-10',
    });

    await ormPeopleRepository.create(mockPeople);
    expect(mockRepository.save).toBeCalledWith(mockPeople);
  });
});
