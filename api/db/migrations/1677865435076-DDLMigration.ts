/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class DDLMigration1677865435076 implements MigrationInterface {
    name = 'DDLMigration1677865435076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "department_id" integer, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jn_employee_project" ("id" SERIAL NOT NULL, "employee_id" integer, "project_id" integer, CONSTRAINT "PK_59d543bfbd79009f75099908fdc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_project" ("employee_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_70c3fff2ac9d3427b5050e87a6b" PRIMARY KEY ("employee_id", "project_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f3f2bdd1467556e58c38d68129" ON "employee_project" ("employee_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_15caa6a8166f1ddf2ed79001c7" ON "employee_project" ("project_id") `);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jn_employee_project" ADD CONSTRAINT "FK_b9c702568ce978cf6df8ac64e8d" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jn_employee_project" ADD CONSTRAINT "FK_54533dd3147c0e4ec6b9b02d253" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_project" ADD CONSTRAINT "FK_f3f2bdd1467556e58c38d68129b" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_project" ADD CONSTRAINT "FK_15caa6a8166f1ddf2ed79001c71" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_project" DROP CONSTRAINT "FK_15caa6a8166f1ddf2ed79001c71"`);
        await queryRunner.query(`ALTER TABLE "employee_project" DROP CONSTRAINT "FK_f3f2bdd1467556e58c38d68129b"`);
        await queryRunner.query(`ALTER TABLE "jn_employee_project" DROP CONSTRAINT "FK_54533dd3147c0e4ec6b9b02d253"`);
        await queryRunner.query(`ALTER TABLE "jn_employee_project" DROP CONSTRAINT "FK_b9c702568ce978cf6df8ac64e8d"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_15caa6a8166f1ddf2ed79001c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3f2bdd1467556e58c38d68129"`);
        await queryRunner.query(`DROP TABLE "employee_project"`);
        await queryRunner.query(`DROP TABLE "jn_employee_project"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
