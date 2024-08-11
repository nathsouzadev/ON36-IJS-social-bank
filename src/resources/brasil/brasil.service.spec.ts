import { Test, TestingModule } from '@nestjs/testing';
import { BrasilService } from './brasil.service';
import * as nock from 'nock';

describe('BrasilService', () => {
  let service: BrasilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrasilService],
    }).compile();

    service = module.get<BrasilService>(BrasilService);
  });

  it('should be get cnpj valid data', async () => {
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
      });

    const response = await service.cnpj(mockCnpj);
    expect(response).toMatchObject({
      cnpj: mockCnpj,
      isValid: true,
    });
  });

  it('should be get cnpj not exists data', async () => {
    const mockCnpj = '82987916000141';

    nock('https://brasilapi.com.br')
      .get(`/api/cnpj/v1/${mockCnpj}`)
      .reply(404, {
        message: 'CNPJ 82.987.916/0001-41 não encontrado.',
        type: 'not_found',
        name: 'NotFoundError',
      });

    const response = await service.cnpj(mockCnpj);
    expect(response).toMatchObject({
      cnpj: expect.any(String),
      isValid: false,
    });
  });

  it('should be get cnpj invalid data', async () => {
    const mockCnpj = '0000000000000';

    nock('https://brasilapi.com.br')
      .get(`/api/cnpj/v1/${mockCnpj}`)
      .reply(400, {
        message: 'CNPJ 0000000000000 inválido.',
        type: 'bad_request',
        name: 'BadRequestError',
      });

    const response = await service.cnpj(mockCnpj);
    expect(response).toMatchObject({
      cnpj: expect.any(String),
      isValid: false,
    });
  });
});
