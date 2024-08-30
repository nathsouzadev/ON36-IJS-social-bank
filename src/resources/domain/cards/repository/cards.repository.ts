import { Card } from 'src/config/db/entities/card.entity';
import { CreateCardDto } from '../dto/create-card.dto';

export abstract class CardsRepository {
  abstract create(createCardDto: CreateCardDto): Promise<Card>;
  abstract get(id: string): Promise<Card>;
}
