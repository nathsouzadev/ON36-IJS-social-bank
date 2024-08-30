import { Purchase } from '../../../config/db/entities/purchase.entity';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';

export abstract class PurchaseRepository {
  abstract create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase>;
}
