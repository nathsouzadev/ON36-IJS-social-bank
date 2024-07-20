import { Module } from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CustomerController } from './customer.controller';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
