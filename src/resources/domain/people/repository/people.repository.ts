import { People } from '../../../../config/db/entities/people.entity';

export abstract class PeopleRepository {
  abstract create(people: People): Promise<People>;
}
