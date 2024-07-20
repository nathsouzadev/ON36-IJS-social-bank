import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CustomerDto } from './dto/create-customer.dto';
import { AccountDto } from '../accounts/dto/create-account.dto';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get(':customerId')
  get(@Param('customerId') customerId: string) {
    return this.customerService.get(customerId);
  }

  @Post(':customerId/accounts')
  addAccount(
    @Param('customerId') customerId: string, 
    @Body() accountDto: AccountDto
  ) {
    return this.customerService.createAccount({
      ...accountDto,
      customerId
    });
  }
}
