import { Controller, Post, Body } from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }
}
