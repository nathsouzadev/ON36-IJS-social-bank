import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { customersProvider } from '../../config/providers/customers.provider';
import { People } from '../../config/db/entities/people.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  controllers: [CustomerController],
  providers: customersProvider,
})
export class CustomerModule {}
