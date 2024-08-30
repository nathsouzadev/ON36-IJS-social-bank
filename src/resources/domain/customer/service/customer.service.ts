import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDto } from '../dto/create-customer.dto';
import { AccountDto } from '../../../resources/accounts/dto/create-account.dto';
import { AccountsService } from '../../../resources/accounts/accounts.service';
import { UpdateAccountDto } from '../../../resources/accounts/dto/update-account.dto';
import { CustomerRepository } from '../repository/customer.repository';
import { PeopleService } from '../../../resources/people/people.service';
import { Customer } from '../../../config/db/entities/customer.entity';
import { Account } from '../../../config/db/entities/account.entity';

@Injectable()
export class CustomerService {
  constructor(
    private readonly accountService: AccountsService,
    private readonly customerRepository: CustomerRepository,
    private readonly peopleService: PeopleService,
  ) {}

  create = async (customerDto: CustomerDto): Promise<Customer> => {
    const people = await this.peopleService.create(customerDto);

    const customer = this.customerRepository.create(people.id);
    return customer;
  };

  get = async (id: string): Promise<Customer> =>
    this.customerRepository.get(id);

  validateCustomer = async (id: string): Promise<void> => {
    const customer = await this.customerRepository.get(id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
  };

  createAccount = async (accountDto: AccountDto): Promise<Account> => {
    await this.validateCustomer(accountDto.customerId);
    return this.accountService.create(accountDto);
  };

  updateAccount = async (
    accountDto: UpdateAccountDto,
  ): Promise<{ message: string }> => {
    await this.validateCustomer(accountDto.customerId);
    return this.accountService.update(accountDto);
  };

  deleteAccount = async (
    accountId: string,
    customerId: string,
  ): Promise<{ message: string }> => {
    await this.validateCustomer(customerId);
    return this.accountService.delete(accountId);
  };
}
