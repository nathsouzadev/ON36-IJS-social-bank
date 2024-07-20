import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create customer', async () => {
    return request(app.getHttpServer())
      .post('/api/customers')
      .send({
        name: 'Ada Lovelace',
        email: 'ada@idiomaparatodos.com.br',
        city: 'Londres',
        phoneNumber: '+5511123456789',
        cpf: '12345678900',
        birthdate: '1815-12-10',
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
            }
          }
        });
      });
  });
});
