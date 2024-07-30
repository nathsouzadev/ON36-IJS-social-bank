import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDto } from '../dto/create-customer.dto';
import { database } from '../../../config/db/db';
import { People } from '../../../resources/people/entities/person.entity';
import { Customer } from '../entities/customer.entity';
import { AccountDto } from '../../../resources/accounts/dto/create-account.dto';
import { AccountsService } from '../../../resources/accounts/accounts.service';
import { UpdateAccountDto } from '../../../resources/accounts/dto/update-account.dto';
import { SavingsAccountService } from '../../../resources/accounts/savings-account.service';
import { CurrentAccountService } from '../../../resources/accounts/current-account.service';

@Injectable()
export class CustomerService {
  db = database;

  constructor(
    private readonly accountService: AccountsService,
    private readonly savingsAccountService: SavingsAccountService,
    private readonly currentAccountService: CurrentAccountService,
  ) {}

  private validateCustomer = (id: string): number => {
    console.log(this.db);
    const index = this.db.findIndex((customer) => customer.id === id);
    if (index === -1) {
      throw new NotFoundException('Customer not found');
    }

    return index;
  };

  create(customerDto: CustomerDto) {
    const customer = new Customer(
      new People(customerDto),
      customerDto.managerId,
    );
    this.db.push(customer);
    return { customer };
  }

  get = (id: string) => {
    const customer = this.db.find((customer) => customer.id === id);
    return { customer };
  };

  createAccount = (accountDto: AccountDto) => {
    const customerIndex = this.validateCustomer(accountDto.customerId);

    const account =
      accountDto.type === 'savings'
        ? this.savingsAccountService.create(accountDto)
        : this.currentAccountService.create({
            ...accountDto,
            customerIndex,
          });

    return account;
  };

  updateAccount = (accountDto: UpdateAccountDto) => {
    const customerIndex = this.validateCustomer(accountDto.customerId);
    const account = this.accountService.update({
      ...accountDto,
      customerIndex,
    });

    return account;
  };

  deleteAccount = (accountId: string, customerId: string) => {
    const customerIndex = this.validateCustomer(customerId);
    const response = this.accountService.delete(accountId, customerIndex);

    return {
      response,
      customer: this.db[customerIndex],
    };
  };

  withdraw = (data: {
    amount: number;
    customerId: string;
    accountId: string;
  }) => {
    const customerIndex = this.validateCustomer(data.customerId);
    const account = this.accountService.withdraw({
      amount: data.amount,
      customerIndex,
      accountId: data.accountId,
    });

    return { account };
  };

  deposit = (data: {
    amount: number;
    customerId: string;
    accountId: string;
  }) => {
    const customerIndex = this.validateCustomer(data.customerId);
    const account = this.accountService.deposit({
      amount: data.amount,
      customerIndex,
      accountId: data.accountId,
    });

    return { account };
  };
}
