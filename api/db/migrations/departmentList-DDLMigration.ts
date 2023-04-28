/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDepartmentTable1621461182977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "department" (id, name) VALUES (1, 'Information Technology')`);
    await queryRunner.query(`INSERT INTO "department" (id, name) VALUES (2, 'Marketing')`);
    await queryRunner.query(`INSERT INTO "department" (id, name) VALUES (3, 'Human Resources')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "department"`);
  }
}