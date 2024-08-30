import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Manager1724969813223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'managers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'peopleId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'customerId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('managers');
  }
}
