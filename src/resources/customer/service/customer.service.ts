import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDto } from '../dto/create-customer.dto';
import { database } from '../../../config/db/db';
import { People } from '../../../resources/people/entities/person.entity';
import { Customer } from '../entities/customer.entity';
import { AccountDto } from '../../../resources/accounts/dto/create-account.dto';
import { AccountsService } from '../../../resources/accounts/accounts.service';
import { UpdateAccountDto } from '../../../resources/accounts/dto/update-account.dto';

@Injectable()
export class CustomerService {
  db = database;

  constructor(
    private readonly accountService: AccountsService
  ) {}

  private validateCustomer = (id: string): number => {
    const index = this.db.findIndex((customer) => customer.id === id)
    if (index === -1) {
      throw new NotFoundException('Customer not found')
    }  
    
    return index
  }

  create(customerDto: CustomerDto) {
    const customer = new Customer(new People(customerDto))
    this.db.push(customer)
    return { customer }
  }

  get = (id: string) => {
    const customer = this.db.find((customer) => customer.id === id)
    return { customer }
  }

  createAccount = (accountDto: AccountDto) => {
    const customerIndex = this.validateCustomer(accountDto.customerId)
    const account = this.accountService.create({
      ...accountDto,
      customerIndex
    })

    return account
  }

  updateAccount = (accountDto: UpdateAccountDto) => {
    const customerIndex = this.validateCustomer(accountDto.customerId)
    const account = this.accountService.update({
      ...accountDto,
      customerIndex
    })

    return account
  }

  deleteAccount = (accountId: string, customerId: string) => {
    const customerIndex = this.validateCustomer(customerId)
    const response = this.accountService.delete(accountId, customerIndex)

    return {
      response,
      customer: this.db[customerIndex]
    }
  }
}
