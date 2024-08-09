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

  @Post(':customerId/account')
  addAccount(
    @Param('customerId') customerId: string,
    @Body() accountDto: AccountDto,
  ) {
    return this.customerService.createAccount({
      ...accountDto,
      customerId,
    });
  }

  @Patch(':customerId/account/:accountId')
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

  @Delete(':customerId/account/:accountId')
  deleteAccount(
    @Param('customerId') customerId: string,
    @Param('accountId') accountId: string,
  ) {
    return this.customerService.deleteAccount(accountId, customerId);
  }

  @Patch(':customerId/account/:accountId/withdraw')
  withdraw(
    @Body() operationDto: { amount: number },
    @Param('customerId') customerId: string,
    @Param('accountId') accountId: string,
  ) {
    return 0
  }

  @Patch(':customerId/account/:accountId/deposit')
  deposit(
    @Body() operationDto: { amount: number },
    @Param('customerId') customerId: string,
    @Param('accountId') accountId: string,
  ) {
    return 0
  }
}
