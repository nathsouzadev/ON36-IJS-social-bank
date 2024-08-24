import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { People } from './entities/person.entity';
import { PeopleRepository } from './repository/people.repository';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  create = async (createPersonDto: CreatePersonDto): Promise<People> => {
    const people = new People(createPersonDto);
    return this.peopleRepository.create(people);
  };
}
