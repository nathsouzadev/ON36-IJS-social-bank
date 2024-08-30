import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseRepository } from './repository/purchase.repository';
import { Purchase } from '../../config/db/entities/purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(private readonly purchaseRepository: PurchaseRepository) {}

  create = async (createPurchaseDto: CreatePurchaseDto): Promise<Purchase> =>
    this.purchaseRepository.create(createPurchaseDto);
}
