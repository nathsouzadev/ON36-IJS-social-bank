import 'dotenv/config';
import { DataSource } from 'typeorm';
import { People } from './entities/people.entity';
import { Account } from './entities/account.entity';
import { Card } from './entities/card.entity';
import { Customer } from './entities/customer.entity';
import { Manager } from './entities/manager.entity';
import { Purchase } from './entities/purchase.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [People, Account, Card, Customer, Manager, Purchase],
  logging: true,
  migrations: ['./src/config/db/migrations/*.ts'],
});

export default dataSource;
