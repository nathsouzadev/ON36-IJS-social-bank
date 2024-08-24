import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { randomUUID } from 'crypto';
import dataSource from '../src/config/db/dataSource';

describe('customer e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.destroy();
    await app.close();
  });

  it('should create customer', async () => {
    return request(app.getHttpServer())
      .post('/api/customer')
      .send({
        name: 'Ada Lovelace',
        email: 'ada@idiomaparatodos.com.br',
        city: 'Londres',
        phoneNumber: '+5511123456789',
        cpf: '12345678900',
        birthdate: '1815-12-10',
        managerId: randomUUID(),
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          customer: {
            id: expect.any(String),
            accounts: expect.any(Array),
            people: {
              id: expect.any(String),
              name: 'Ada Lovelace',
              email: 'ada@idiomaparatodos.com.br',
              city: 'Londres',
              phoneNumber: '+5511123456789',
              cpf: '12345678900',
              birthdate: '1815-12-10',
            },
            managerId: expect.any(String),
          },
        });
      });
  });

  it('should get customer', async () => {
    const mockCustomerId = '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4';

    return request(app.getHttpServer())
      .get(`/api/customer/${mockCustomerId}`)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          customer: {
            id: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
            accounts: [
              {
                id: 'ac8eede5-80d6-463a-8256-09c41dab5124',
                customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
                balance: 1000,
                type: 'current',
                interestRate: 0.02,
                overdraftLimit: 1000,
              },
            ],
            people: {
              id: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
              name: 'Grace Hooper',
              email: 'grace@idiomaparatodos.com.br',
              city: 'Londres',
              phoneNumber: '+5511123456789',
              cpf: '12345678900',
              birthdate: '1815-12-10',
            },
            managerId: '76a2237f-1ddc-4aa3-9db7-66f7518b8f28',
          },
        });
      });
  });

  it('should get customer empty', async () => {
    const mockCustomerId = randomUUID();

    return request(app.getHttpServer())
      .get(`/api/customer/${mockCustomerId}`)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject({});
      });
  });
});
