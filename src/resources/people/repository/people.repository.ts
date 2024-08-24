import { People } from '../entities/person.entity';

export abstract class PeopleRepository {
  abstract create(people: People): Promise<People>;
}
