import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const dataSource = (configService: ConfigService) =>
  new DataSource({
    type: 'postgres',
    host: configService.get('db.host'),
    port: configService.get('db.port'),
    username: configService.get('db.username'),
    password: configService.get('db.password'),
    database: configService.get('db.database'),
    entities: [],
    logging: true,
  });

export const dataSourceTest = (configService: ConfigService) => {
  const source = dataSource(configService);
  return {
    ...source,
    migrations: ['./src/config/migrations/*.ts'],
  }
}
