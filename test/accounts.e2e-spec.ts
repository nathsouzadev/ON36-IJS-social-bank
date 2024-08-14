import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as nock from 'nock';

describe('accounts e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create savings account', async () => {
    const mockCustomerId = '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4';

    return request(app.getHttpServer())
      .post(`/api/customer/${mockCustomerId}/account`)
      .send({
        type: 'savings',
        balance: 1000,
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          account: {
            id: expect.any(String),
            customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
            balance: 1000,
            type: 'savings',
            interestRate: 0.02,
            overdraftLimit: 0,
          },
        });
      });
  });

  it('should create current account', async () => {
    const mockCustomerId = '28de278f-b119-4d69-b1b4-7abd9de9ace0';

    return request(app.getHttpServer())
      .post(`/api/customer/${mockCustomerId}/account`)
      .send({
        type: 'current',
        balance: 1000,
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          account: {
            id: expect.any(String),
            customerId: mockCustomerId,
            balance: 1000,
            type: 'current',
            interestRate: 0.02,
            overdraftLimit: 1000,
            card: {
              id: expect.any(String),
              accountId: expect.any(String),
              customerId: mockCustomerId,
              number: expect.any(String),
              cvv: expect.any(String),
              expirationDate: expect.any(String),
              limit: 500,
            },
          },
        });
      });
  });

  it('should create company account', async () => {
    const mockCustomerId = '28de278f-b119-4d69-b1b4-7abd9de9ace0';
    const mockCnpj = '17895646000420';

    nock('https://brasilapi.com.br')
      .get(`/api/cnpj/v1/${mockCnpj}`)
      .reply(200, {
        uf: 'DF',
        cep: '70701000',
        cnpj: mockCnpj,
        razao_social: 'UBER DO BRASIL TECNOLOGIA LTDA.',
        nome_fantasia: 'UBER DO BRASIL',
        capital_social: 100005,
        qsa: [
          {
            nome_socio: 'Dorothy Vaughan',
            qualificacao_socio: 'Sócio-Administrador',
          },
        ],
        cnae_fiscal_descricao:
          'Desenvolvimento de programas de computador sob encomenda',
      });

    return request(app.getHttpServer())
      .post(`/api/customer/${mockCustomerId}/account`)
      .send({
        type: 'company',
        balance: 1000,
        cnpj: mockCnpj,
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          account: {
            id: expect.any(String),
            customerId: mockCustomerId,
            balance: 1000,
            type: 'company',
            interestRate: 0.02,
            overdraftLimit: 1000,
            card: {
              id: expect.any(String),
              accountId: expect.any(String),
              customerId: mockCustomerId,
              number: expect.any(String),
              cvv: expect.any(String),
              expirationDate: expect.any(String),
              limit: 500,
            },
            company: {
              cnpj: '17895646000420',
              address: '70701000',
              partners: [
                {
                  name: 'Dorothy Vaughan',
                  type: 'Sócio-Administrador',
                },
              ],
              cnae: 'Desenvolvimento de programas de computador sob encomenda',
            },
          },
        });
      });
  });

  it('should update account type', async () => {
    const mockCustomerId = '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4';
    const mockAccountId = 'ac8eede5-80d6-463a-8256-09c41dab5124';

    return request(app.getHttpServer())
      .patch(`/api/customer/${mockCustomerId}/account/${mockAccountId}`)
      .send({
        type: 'savings',
      })
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          account: {
            id: mockAccountId,
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
    const mockCustomerId = '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4';
    const mockAccountId = 'ac8eede5-80d6-463a-8256-09c41dab5124';

    return request(app.getHttpServer())
      .delete(`/api/customer/${mockCustomerId}/account/${mockAccountId}`)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          message: 'Account deleted successfully',
        });
      });
  });
});
