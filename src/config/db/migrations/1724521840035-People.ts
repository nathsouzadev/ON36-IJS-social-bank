import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class People1724521840035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'people',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar(100)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'phoneNumber',
            type: 'varchar(20)',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar(11)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'birthdate',
            type: 'date',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('people');
  }
}
