import { Injectable } from '@nestjs/common';
import { PurchaseRepository } from '../purchase.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from '../../../../config/db/entities/purchase.entity';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from '../../dto/create-purchase.dto';

@Injectable()
export class ORMPurchaseRepository implements PurchaseRepository {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  create = async (createPurchaseDto: CreatePurchaseDto): Promise<Purchase> =>
    this.purchaseRepository.save(createPurchaseDto);
}
