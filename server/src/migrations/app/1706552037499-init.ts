import {MigrationInterface, QueryRunner} from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class init1706552037499 implements MigrationInterface {
    name = 'init1706552037499'

    public async up(queryRunner: QueryRunner): Promise<void> {

        const {schema} = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`CREATE TABLE "${schema}"."user" ("id" SERIAL NOT NULL, "tenantId" character varying NOT NULL, "userId" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const {schema} = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`DROP TABLE "${schema}"."user"`);
    }

}
