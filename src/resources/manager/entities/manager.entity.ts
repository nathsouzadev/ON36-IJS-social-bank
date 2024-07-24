import { randomUUID } from 'crypto';
import { Customer } from '../../../resources/customer/entities/customer.entity';
import { People } from '../../../resources/people/entities/person.entity';

export class Manager {
  id: string;
  customers: Customer[];
  people: People;

  constructor(people: People) {
    this.id = randomUUID();
    this.customers = [];
    this.people = people;
  }
}
