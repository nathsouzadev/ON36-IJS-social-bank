import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../customer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../../../config/db/entities/customer.entity';

@Injectable()
export class ORMCustomerRepository implements CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  create = async (id: string) =>
    this.customerRepository.save({
      peopleId: id,
    });

  get = async (id: string) =>
    this.customerRepository.findOne({
      where: { id },
    });
}
