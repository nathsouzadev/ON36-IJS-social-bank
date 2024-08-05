import { Injectable } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { OperationModel } from './models/operation.model';

@Injectable()
export class CurrentAccountService extends AccountsService {
  
  validateOverdraftLimit = (data: OperationModel) => {
    const { customerIndex, accountId, amount } = data;
    const account = this.get(customerIndex, accountId);
    
    if (account.balance - amount < -account.overdraftLimit) {
      throw new Error('Overdraft limit exceeded');
    }
  }
}
