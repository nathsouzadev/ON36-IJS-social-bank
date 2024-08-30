import { ManagerRepository } from '../../resources/manager/repository/manager.repository';
import { ORMManagerRepository } from '../../resources/manager/repository/typeorm/ormManager.repository';
import { ManagerService } from '../../resources/manager/service/manager.service';
import { customersProvider } from './customers.provider';

export const managersProvider = [
  ManagerService,
  {
    provide: ManagerRepository,
    useClass: ORMManagerRepository,
  },
  ...customersProvider,
];
