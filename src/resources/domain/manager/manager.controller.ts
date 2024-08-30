import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagerService } from './service/manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateAccountDto } from '../accounts/dto/update-account.dto';
import { CustomerDto } from '../customer/dto/create-customer.dto';

@Controller()
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @Post(':managerId/customer')
  addCustomer(
    @Param('managerId') managerId: string,
    @Body() customerDto: CustomerDto,
  ) {
    return this.managerService.createCustomer(managerId, customerDto);
  }

  @Patch(':managerId/customer/:customerId/account/:accountId')
  updateCustomerAccount(
    @Param('managerId') managerId: string,
    @Param('customerId') customerId: string,
    @Param('accountId') accountId: string,
    @Body() accountDto: UpdateAccountDto,
  ) {
    return this.managerService.updateCustomerAccount(managerId, {
      ...accountDto,
      customerId,
      accountId,
    });
  }

  @Delete(':managerId/customer/:customerId/account/:accountId')
  deleteCustomerAccount(
    @Param('managerId') managerId: string,
    @Param('customerId') customerId: string,
    @Param('accountId') accountId: string,
  ) {
    return this.managerService.deleteCustomerAccount(
      managerId,
      customerId,
      accountId,
    );
  }
}
