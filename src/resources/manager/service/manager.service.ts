import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { database } from '../../../config/db/db';
import { Manager } from '../entities/manager.entity';
import { CustomerService } from '../../../resources/customer/service/customer.service';
import { UpdateAccountDto } from '../../../resources/accounts/dto/update-account.dto';
import { CustomerDto } from '../../../resources/customer/dto/create-customer.dto';
import { ManagerRepository } from '../repository/manager.repository';

@Injectable()
export class ManagerService {
  db = database;

  constructor(
    private readonly customerService: CustomerService,
    private readonly managerRepository: ManagerRepository,
  ) {}

  validateManager = (id: string): void => {
    const index = this.managerRepository.getIndex(id);

    if (index === -1) {
      throw new NotFoundException('Manager not found');
    }
  };

  create = (createManagerDto: CreateManagerDto): { manager: Manager } =>
    this.managerRepository.create(createManagerDto);

  updateCustomerAccount(managerId: string, accountDto: UpdateAccountDto) {
    this.validateManager(managerId);

    const response = this.customerService.updateAccount(accountDto);
    return response;
  }

  deleteCustomerAccount(
    managerId: string,
    customerId: string,
    accountId: string,
  ) {
    this.validateManager(managerId);

    const response = this.customerService.deleteAccount(accountId, customerId);
    return response;
  }

  createCustomer(managerId: string, customerDto: CustomerDto) {
    this.validateManager(managerId);

    const response = this.customerService.create({
      ...customerDto,
      managerId,
    });

    const updatedDb = [...this.db];
    const managerIndex = updatedDb.findIndex(
      (manager) => manager.id === managerId,
    );
    updatedDb[managerIndex]['customers'].push(response.customer);
    this.db = updatedDb;

    return response;
  }
}
