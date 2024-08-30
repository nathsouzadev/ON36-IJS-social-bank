import { Injectable } from '@nestjs/common';
import { PeopleRepository } from '../people.repository';
import { People } from '../../entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ORMPeopleRepository implements PeopleRepository {
  constructor(
    @InjectRepository(People) private peopleRepository: Repository<People>,
  ) {}

  create = async (people: People) => this.peopleRepository.save(people);
}
