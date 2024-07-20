import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagerService } from './service/manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateAccountDto } from '../accounts/dto/update-account.dto';

@Controller()
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @Patch(':managerId/customer/:customerId/accounts/:accountId')
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

  @Delete(':managerId/customer/:customerId/accounts/:accountId')
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
