import { ManagerModule } from '../resources/manager/manager.module';
import { HealthModule } from '../health/health.module';
import { CustomerModule } from '../resources/customer/customer.module';

export const router = [
  {
    path: 'api',
    children: [
      {
        path: 'health',
        module: HealthModule,
      },
      {
        path: 'customers',
        module: CustomerModule
      },
      {
        path: 'managers',
        module: ManagerModule
      }
    ],
  },
];
