import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AccountFK1724972052606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'accounts',
      new TableForeignKey({
        name: 'FKCustomer',
        columnNames: ['customerId'],
        referencedTableName: 'customers',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('accounts', 'FKCustomer');
  }
}
