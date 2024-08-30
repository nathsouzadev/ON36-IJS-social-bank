import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CardFK1724972130358 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('cards', [
      new TableForeignKey({
        name: 'FKCustomer',
        columnNames: ['customerId'],
        referencedTableName: 'customers',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FKAccount',
        columnNames: ['accountId'],
        referencedTableName: 'accounts',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cards', 'FKCustomer');
    await queryRunner.dropForeignKey('cards', 'FKAccount');
  }
}
