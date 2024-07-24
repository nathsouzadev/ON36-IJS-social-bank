import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { People } from './entities/person.entity';

@Injectable()
export class PeopleService {
  create(createPersonDto: CreatePersonDto) {
    return new People(createPersonDto);
  }
}
