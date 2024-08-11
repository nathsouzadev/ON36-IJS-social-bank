import { Injectable } from '@nestjs/common';
import { CustomerDto } from '../dto/create-customer.dto';
import { database } from '../../../config/db/db';
import { People } from '../../people/entities/person.entity';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository {
  db = database;

  create = (customerDto: CustomerDto): { customer: Customer } => {
    const customer = new Customer(
      new People(customerDto),
      customerDto.managerId,
    );
    this.db.push(customer);
    return { customer };
  };

  get = (id: string): { customer: Customer } => {
    const customer = this.db.find((customer) => customer.id === id) as Customer;
    return { customer };
  };

  getIndex = (id: string): number =>
    this.db.findIndex((customer) => customer.id === id);
}
