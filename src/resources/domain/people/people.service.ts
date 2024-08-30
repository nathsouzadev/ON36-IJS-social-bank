import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { PeopleRepository } from './repository/people.repository';
import { People } from '../../config/db/entities/people.entity';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  create = async (createPersonDto: CreatePersonDto): Promise<People> => {
    const { name, email, city, phoneNumber, cpf, birthdate } = createPersonDto;

    const people = new People(name, email, city, phoneNumber, cpf, birthdate);
    return this.peopleRepository.create(people);
  };
}
