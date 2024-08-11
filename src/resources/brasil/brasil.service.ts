import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CNPJResponse } from './models/cnpj-response.model';
import { cnpjWireIn } from './adapters/cnpj-wire-in';

@Injectable()
export class BrasilService {
  cnpj = async (cnpj: string): Promise<CNPJResponse> => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
      });

      return cnpjWireIn(response.status, cnpj);
    } catch (error) {
      return cnpjWireIn(error.response.status, cnpj);
    }
  };
}
