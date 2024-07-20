export class AccountDto {
    customerId: string;
    customerIndex: number;
    type: 'savings' | 'current';
    balance = 0;
}
