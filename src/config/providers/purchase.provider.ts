import { PurchaseService } from '../../resources/purchase/purchase.service';
import { PurchaseRepository } from '../../resources/purchase/repository/purchase.repository';
import { ORMPurchaseRepository } from '../../resources/purchase/repository/typeorm/ormPuchase.repository';

export const purchaseProvider = [
  PurchaseService,
  {
    provide: PurchaseRepository,
    useClass: ORMPurchaseRepository,
  },
];
