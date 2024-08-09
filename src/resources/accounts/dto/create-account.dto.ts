export enum AccountType {
  SAVINGS = 'savings',
  CURRENT = 'current',
}

export class AccountDto {
  customerId: string;
  customerIndex: number;
  type: AccountType;
  balance = 0;
}
