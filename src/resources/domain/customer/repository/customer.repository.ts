import { Customer } from '../../../config/db/entities/customer.entity';

export abstract class CustomerRepository {
  abstract create(id: string): Promise<Customer>;
  abstract get(id: string): Promise<Customer>;
}
