import { randomUUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string = randomUUID();

  @Column()
  cardId: string;

  @ManyToOne(() => Card, (card) => card.purchases)
  @JoinColumn()
  card: Card;

  @Column()
  amount: number;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  createdAt: Date;

  @Column()
  cnpj: string;

  constructor(amount: number, cardId: string, cnpj: string) {
    this.amount = amount;
    this.cardId = cardId;
    this.cnpj = cnpj;
  }
}
