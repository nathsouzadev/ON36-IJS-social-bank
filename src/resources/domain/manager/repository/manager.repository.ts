import { Manager } from '../../../config/db/entities/manager.entity';

export abstract class ManagerRepository {
  abstract create(id: string): Promise<Manager>;

  abstract get(id: string): Promise<Manager>;
}
