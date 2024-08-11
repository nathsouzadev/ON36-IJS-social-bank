import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { customersProvider } from '../../config/providers/customers.provider';

@Module({
  controllers: [CustomerController],
  providers: customersProvider,
})
export class CustomerModule {}
