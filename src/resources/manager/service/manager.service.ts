import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { database } from '../../../config/db/db';
import { Manager } from '../entities/manager.entity';
import { People } from '../../../resources/people/entities/person.entity';
import { CustomerService } from '../../../resources/customer/service/customer.service';
import { UpdateAccountDto } from '../../../resources/accounts/dto/update-account.dto';

@Injectable()
export class ManagerService {
  db = database;

  constructor(private readonly customerService: CustomerService) {}

  create(createManagerDto: CreateManagerDto) {
    const manager = new Manager(new People(createManagerDto));
    this.db.push(manager);

    return { manager };
  }

  updateAccount(managerId: string, accountDto: UpdateAccountDto) {
    const validateManager = this.db.find(
      (customer) => customer.managerId === managerId,
    );

    if (!validateManager) {
      throw new NotFoundException('Manager not found');
    }

    const response = this.customerService.updateAccount(accountDto);
    return response;
  }
}
