import { Controller, Post, Body } from '@nestjs/common';
import { ManagerService } from './service/manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';

@Controller()
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }
}
