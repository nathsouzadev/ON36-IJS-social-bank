import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Card1724969828938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'customerId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'accountId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'varchar',
            length: '16',
            isNullable: false,
          },
          {
            name: 'cvv',
            type: 'varchar',
            length: '3',
            isNullable: false,
          },
          {
            name: 'expirationDate',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'limit',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 500,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards');
  }
}
