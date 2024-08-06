import { ManagerService } from 'src/resources/manager/service/manager.service';
import { customersProvider } from './customers.provider';

export const managersProvider = [ManagerService, ...customersProvider];
