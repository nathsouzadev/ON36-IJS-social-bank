import { ORMPeopleRepository } from '../../resources/people/repository/typeorm/ormPeople.repository';
import { PeopleService } from '../../resources/people/people.service';
import { PeopleRepository } from '../../resources/people/repository/people.repository';

export const peopleProviders = [
  PeopleService,
  {
    provide: PeopleRepository,
    useClass: ORMPeopleRepository
  },
];
