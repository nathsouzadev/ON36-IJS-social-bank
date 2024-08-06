import { Test, TestingModule } from '@nestjs/testing';
import { ManagerRepository } from './manager.repository';
import { randomUUID } from 'crypto';

describe('ManagerService', () => {
  let repository: ManagerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerRepository],
    }).compile();

    repository = module.get<ManagerRepository>(ManagerRepository);
  });

  it('should be create a manager', () => {
    const mockCreateManagerDto = {
      name: 'Katherine Johnson',
      email: 'katherine@idiomaparatodos.com.br',
      city: 'White Sulphur',
      phoneNumber: '5511880881234',
      cpf: '12345678901',
      birthdate: '1918-08-26',
    };

    const response = repository.create(mockCreateManagerDto);
    expect(response).toMatchObject({
      manager: {
        id: expect.any(String),
        customers: [],
        people: {
          id: expect.any(String),
          name: 'Katherine Johnson',
          email: 'katherine@idiomaparatodos.com.br',
          city: 'White Sulphur',
          phoneNumber: '5511880881234',
          cpf: '12345678901',
          birthdate: '1918-08-26',
        },
      },
    });
  });

  it('should be return a manager index', () => {
    [
      {
        managerId: '76a2237f-1ddc-4aa3-9db7-66f7518b8f28',
        index: 0,
      },
      {
        managerId: randomUUID(),
        index: -1,
      },
    ].forEach(({ managerId, index }) => {
      const response = repository.getIndex(managerId);
      expect(response).toBe(index);
    });
  });
});
