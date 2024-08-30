import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { CustomerService } from '../../../resources/customer/service/customer.service';
import { UpdateAccountDto } from '../../../resources/accounts/dto/update-account.dto';
import { CustomerDto } from '../../../resources/customer/dto/create-customer.dto';
import { PeopleService } from '../../../resources/people/people.service';
import { ManagerRepository } from '../repository/manager.repository';
import { Manager } from '../../../config/db/entities/manager.entity';
import { Customer } from '../../../config/db/entities/customer.entity';

@Injectable()
export class ManagerService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly managerRepository: ManagerRepository,
    private readonly peopleService: PeopleService,
  ) {}

  validateManager = async (id: string): Promise<void> => {
    const manager = await this.managerRepository.get(id);

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }
  };

  create = async (createManagerDto: CreateManagerDto): Promise<Manager> => {
    const people = await this.peopleService.create(createManagerDto);

    const manager = this.managerRepository.create(people.id);
    return manager;
  };

  updateCustomerAccount = async (
    managerId: string,
    accountDto: UpdateAccountDto,
  ): Promise<{ message: string }> => {
    await this.validateManager(managerId);
    return this.customerService.updateAccount(accountDto);
  };

  deleteCustomerAccount = async (
    managerId: string,
    customerId: string,
    accountId: string,
  ): Promise<{ message: string }> => {
    await this.validateManager(managerId);
    return this.customerService.deleteAccount(accountId, customerId);
  };

  createCustomer = async (
    managerId: string,
    customerDto: CustomerDto,
  ): Promise<Customer> => {
    this.validateManager(managerId);

    return this.customerService.create({
      ...customerDto,
      managerId,
    });
  };
}
