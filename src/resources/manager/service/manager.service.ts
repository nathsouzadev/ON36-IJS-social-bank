import { Injectable } from '@nestjs/common';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { database } from '../../../config/db/db';
import { Manager } from '../entities/manager.entity';
import { People } from '../../../resources/people/entities/person.entity';

@Injectable()
export class ManagerService {
  db = database;

  create(createManagerDto: CreateManagerDto) {
    const manager = new Manager(new People(createManagerDto));
    this.db.push(manager);

    return { manager };
  }
}
