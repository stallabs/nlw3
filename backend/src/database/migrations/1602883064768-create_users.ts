import  {MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1602883064768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: "id",
          type: "integer",
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment",
        },
        {
          name: "email",
          type: "varchar",
          isUnique: true,
        },
        {
          name: "password",
          type: "varchar"
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }

}
