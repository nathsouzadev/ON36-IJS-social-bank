import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { PeopleRepository } from './repository/people.repository';
import { People } from './entities/person.entity';

describe('PeopleService', () => {
  let service: PeopleService;
  let mockPeopleRepository: PeopleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: PeopleRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
    mockPeopleRepository = module.get<PeopleRepository>(PeopleRepository);
  });

  it('should create people', async () => {
    const mockCustomerDto = {
      name: 'Mary Jackson',
      email: 'may@idiomaparatodos.com.br',
      city: 'Hampton',
      phoneNumber: '5511880881234',
      cpf: '12345678901',
      birthdate: '1921-04-09',
    };

    const mockPeople = new People(mockCustomerDto);

    jest
      .spyOn(mockPeopleRepository, 'create')
      .mockImplementation(() => Promise.resolve(mockPeople));

    const response = await service.create(mockCustomerDto);
    expect(mockPeopleRepository.create).toBeCalledWith({
      ...mockCustomerDto,
      id: expect.any(String),
    });
    expect(response).toMatchObject({
      id: expect.any(String),
      name: 'Mary Jackson',
      email: 'may@idiomaparatodos.com.br',
      city: 'Hampton',
      phoneNumber: '5511880881234',
      cpf: '12345678901',
      birthdate: '1921-04-09',
    });
  });
});
