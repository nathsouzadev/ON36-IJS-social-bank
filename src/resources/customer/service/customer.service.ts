import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDto } from '../dto/create-customer.dto';
import { Customer } from '../entities/customer.entity';
import { AccountDto } from '../../../resources/accounts/dto/create-account.dto';
import { AccountsService } from '../../../resources/accounts/accounts.service';
import { UpdateAccountDto } from '../../../resources/accounts/dto/update-account.dto';
import { CustomerRepository } from '../repository/customer.repository';

@Injectable()
export class CustomerService {
  constructor(
    private readonly accountService: AccountsService,
    private readonly customerRepository: CustomerRepository,
  ) {}

  validateCustomer = (id: string): number => {
    const index = this.customerRepository.getIndex(id);
    if (index === -1) {
      throw new NotFoundException('Customer not found');
    }

    return index;
  };

  create = (customerDto: CustomerDto): { customer: Customer } =>
    this.customerRepository.create(customerDto);

  get = (id: string): { customer: Customer } => this.customerRepository.get(id);

  createAccount = async (accountDto: AccountDto) => {
    const customerIndex = this.validateCustomer(accountDto.customerId);
    const account = await this.accountService.create({
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

  deleteAccount = (
    accountId: string,
    customerId: string,
  ): { message: string } => {
    const customerIndex = this.validateCustomer(customerId);
    const response = this.accountService.delete(accountId, customerIndex);

    return response;
  };
}
