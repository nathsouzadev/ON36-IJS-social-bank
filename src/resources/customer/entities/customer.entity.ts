import { randomUUID } from 'crypto';
import { People } from '../../../resources/people/entities/person.entity';

export class Customer {
  id: string;
  people: People;
  accounts: any[];

  constructor(people: People) {
    this.id = randomUUID();
    this.accounts = [];
    this.people = people;
  }
}
