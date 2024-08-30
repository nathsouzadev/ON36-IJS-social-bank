import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class ManagerFK1724971871323 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('managers', [
      new TableForeignKey({
        name: 'FKPeople',
        columnNames: ['peopleId'],
        referencedTableName: 'people',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FKCustomer',
        columnNames: ['customerId'],
        referencedTableName: 'customers',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('managers', 'FKPeople');
    await queryRunner.dropForeignKey('managers', 'FKCustomer');
  }
}
