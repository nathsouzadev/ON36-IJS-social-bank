import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class PurchaseFK1724972198137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'purchases',
      new TableForeignKey({
        name: 'FKCard',
        columnNames: ['cardId'],
        referencedTableName: 'cards',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('purchases', 'FKCard');
  }
}
