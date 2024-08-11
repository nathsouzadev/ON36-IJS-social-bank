import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BrasilService {
  cnpj = async (cnpj: string) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
      });

      return {
        cnpj: response.data.cnpj,
        isValid: true,
      };
    } catch (error) {
      if (error.response.status === 404 || error.response.status === 400) {
        return {
          cnpj: cnpj,
          isValid: false,
        };
      }
    }
  };
}
