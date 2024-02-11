import {MigrationInterface, QueryRunner} from "typeorm";

export class init1706552068077 implements MigrationInterface {
    name = 'init1706552068077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tenant" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "hashRt" character varying, CONSTRAINT "UQ_5b5d9635409048b7144f5f23198" UNIQUE ("email"), CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tenant"`);
    }

}
