import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Customer1724795849585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'managerId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'peopleId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers');
  }
}
