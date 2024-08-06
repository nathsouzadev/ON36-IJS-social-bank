import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { randomUUID } from 'crypto';

describe('manager e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create manager', async () => {
    return request(app.getHttpServer())
      .post('/api/manager')
      .send({
        name: 'Katherine Johnson',
        email: 'katherine@idiomaparatodos.com.br',
        city: 'White Sulphur',
        phoneNumber: '5511880881234',
        cpf: '12345678901',
        birthdaydate: '1918-08-26',
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toMatchObject({
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
            },
          },
        });
      });
  });

  it('should create customer', async () => {
    const mockManagerId = '76a2237f-1ddc-4aa3-9db7-66f7518b8f28';

    return request(app.getHttpServer())
      .post(`/api/manager/${mockManagerId}/customer`)
      .send({
        name: 'Mary Jackson',
        email: 'may@idiomaparatodos.com.br',
        city: 'Hampton',
        phoneNumber: '5511880881234',
        cpf: '12345678901',
        birthdaydate: '1921-04-09',
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          customer: {
            id: expect.any(String),
            accounts: [],
            people: {
              id: expect.any(String),
              name: 'Mary Jackson',
              email: 'may@idiomaparatodos.com.br',
              city: 'Hampton',
              phoneNumber: '5511880881234',
              cpf: '12345678901',
            },
            managerId: '76a2237f-1ddc-4aa3-9db7-66f7518b8f28',
          },
        });
      });
  });

  it('should update account', async () => {
    const mockManagerId = '76a2237f-1ddc-4aa3-9db7-66f7518b8f28';
    const mockCustomerId = '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4';
    const mockAccountId = 'ac8eede5-80d6-463a-8256-09c41dab5124';

    return request(app.getHttpServer())
      .patch(
        `/api/manager/${mockManagerId}/customer/${mockCustomerId}/account/${mockAccountId}`,
      )
      .send({
        type: 'savings',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          account: {
            id: 'ac8eede5-80d6-463a-8256-09c41dab5124',
            customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
            balance: 1000,
            type: 'savings',
            interestRate: 0.02,
            overdraftLimit: 1000,
          },
        });
      });
  });

  it('should delete account', async () => {
    const mockManagerId = '76a2237f-1ddc-4aa3-9db7-66f7518b8f28';
    const mockCustomerId = '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4';
    const mockAccountId = 'ac8eede5-80d6-463a-8256-09c41dab5124';

    return request(app.getHttpServer())
      .delete(
        `/api/manager/${mockManagerId}/customer/${mockCustomerId}/account/${mockAccountId}`,
      )
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          response: {
            message: 'Account deleted successfully',
          },
        });
      });
  });
});
