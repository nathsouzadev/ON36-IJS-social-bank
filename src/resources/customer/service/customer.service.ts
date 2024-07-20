import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { database } from '../../../config/db/db';
import { People } from '../../../resources/people/entities/person.entity';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {
  db = database;

  create(createCustomerDto: CreateCustomerDto) {
    const customer = new Customer(new People(createCustomerDto))
    return { customer }
  }
}
