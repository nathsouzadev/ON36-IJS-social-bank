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
        path: 'customer',
        module: CustomerModule
      },
      {
        path: 'manager',
        module: ManagerModule
      }
    ],
  },
];
