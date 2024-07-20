import { randomUUID } from 'crypto';
import { People } from '../../../resources/people/entities/person.entity';
import { Account } from '../../../resources/accounts/entities/account.entity';

export class Customer {
  id: string;
  people: People;
  accounts: Account[];

  constructor(people: People) {
    this.id = randomUUID();
    this.accounts = [];
    this.people = people;
  }
}
