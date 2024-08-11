import { ManagerRepository } from '../../resources/manager/repository/manager.repository';
import { ManagerService } from '../../resources/manager/service/manager.service';
import { customersProvider } from './customers.provider';

export const managersProvider = [
  ManagerService,
  ManagerRepository,
  ...customersProvider,
];
