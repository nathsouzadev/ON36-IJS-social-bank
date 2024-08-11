import { Injectable } from '@nestjs/common';
import { CreateBrasilDto } from './dto/create-brasil.dto';
import { UpdateBrasilDto } from './dto/update-brasil.dto';

@Injectable()
export class BrasilService {
  create(createBrasilDto: CreateBrasilDto) {
    return 'This action adds a new brasil';
  }

  findAll() {
    return `This action returns all brasil`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brasil`;
  }

  update(id: number, updateBrasilDto: UpdateBrasilDto) {
    return `This action updates a #${id} brasil`;
  }

  remove(id: number) {
    return `This action removes a #${id} brasil`;
  }
}
