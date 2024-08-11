export enum AccountType {
  SAVINGS = 'savings',
  CURRENT = 'current',
  COMPANY = 'company',
}

export class AccountDto {
  customerId: string;
  customerIndex: number;
  type: AccountType;
  balance = 0;
}
