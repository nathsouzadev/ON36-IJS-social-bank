import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('cards e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a purchase', async () => {
    const mockCardId = '6641d6aa-dfe0-46ff-a803-721a3f1aae9e';
    const mockNumber = '4242505042425050';
    const mockCvv = '123';
    const mockExpirationDate = '12/30';
    const mockCnpj = '18141282000102';

    return request(app.getHttpServer())
      .post(`/api/card/${mockCardId}/purchase`)
      .send({
        amount: 100,
        cnpj: mockCnpj,
        number: mockNumber,
        cvv: mockCvv,
        expirationDate: mockExpirationDate,
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          purchase: {
            id: expect.any(String),
            amount: 100,
            cardId: mockCardId,
            cnpj: mockCnpj,
            created_at: expect.any(String),
          },
        });
      });
  });

  it('should not create a purchase with invalid card data', async () => {
    const mockCardId = '6641d6aa-dfe0-46ff-a803-721a3f1aae9e';

    return request(app.getHttpServer())
      .post(`/api/card/${mockCardId}/purchase`)
      .send({
        amount: 100,
        cnpj: '000000000000',
        number: '0000000000000000',
        cvv: '000',
        expirationDate: '01/90',
      })
      .expect(401)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          error: 'Unauthorized',
          message: 'Invalid card data',
          statusCode: 401,
        });
      });
  });

  it('should not create a purchase with insufficient funds', async () => {
    const mockCardId = '6641d6aa-dfe0-46ff-a803-721a3f1aae9e';

    return request(app.getHttpServer())
      .post(`/api/card/${mockCardId}/purchase`)
      .send({
        amount: 1000,
        cnpj: '18141282000102',
        number: '4242505042425050',
        cvv: '123',
        expirationDate: '12/30',
      })
      .expect(401)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          error: 'Unauthorized',
          message: 'Insuficient founds',
          statusCode: 401,
        });
      });
  });
});
