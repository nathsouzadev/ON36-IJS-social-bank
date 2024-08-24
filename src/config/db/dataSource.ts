import 'dotenv/config';
import { DataSource } from 'typeorm';
import { People } from './entities/people.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [People],
  logging: true,
  migrations: ['./src/config/migrations/*.ts'],
});
  

export default dataSource;
