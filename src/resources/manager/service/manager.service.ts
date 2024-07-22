import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { database } from '../../../config/db/db';
import { Manager } from '../entities/manager.entity';
import { People } from '../../../resources/people/entities/person.entity';
import { CustomerService } from '../../../resources/customer/service/customer.service';
import { UpdateAccountDto } from '../../../resources/accounts/dto/update-account.dto';
import { CustomerDto } from '../../../resources/customer/dto/create-customer.dto';

@Injectable()
export class ManagerService {
  db = database;

  constructor(private readonly customerService: CustomerService) {}

  private validateManager = (id: string): void => {
    const validateManager = this.db.find((manager) => manager.id === id);

    if (!validateManager) {
      throw new NotFoundException('Manager not found');
    }
  };

  create(createManagerDto: CreateManagerDto) {
    const manager = new Manager(new People(createManagerDto));
    this.db.push(manager);

    return { manager };
  }

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
