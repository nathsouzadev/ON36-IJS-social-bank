import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './service/customer.service';
import { CustomerDto } from './dto/create-customer.dto';
import { AccountDto } from '../accounts/dto/create-account.dto';
import { UpdateAccountDto } from '../accounts/dto/update-account.dto';

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
    @Body() accountDto: AccountDto,
  ) {
    return this.customerService.createAccount({
      ...accountDto,
      customerId,
    });
  }

  @Patch(':customerId/accounts/:accountId')
  updateAccount(
    @Param('customerId') customerId: string,
    @Param('accountId') accountId: string,
    @Body() accountDto: UpdateAccountDto,
  ) {
    return this.customerService.updateAccount({
      ...accountDto,
      customerId,
      accountId,
    });
  }

  @Delete(':customerId/accounts/:accountId')
  deleteAccount(
    @Param('customerId') customerId: string,
    @Param('accountId') accountId: string,
  ) {
    return this.customerService.deleteAccount(accountId, customerId);
  }
}
