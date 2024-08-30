import { Injectable } from '@nestjs/common';
import { ManagerRepository } from '../manager.repository';
import { Manager } from '../../,,/../../../config/db/entities/manager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ORMManagerRepository implements ManagerRepository {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}

  create = async (id: string): Promise<Manager> =>
    this.managerRepository.save({
      peopleId: id,
    });

  get = async (id: string): Promise<Manager> =>
    this.managerRepository.findOne({ where: { id } });
}
