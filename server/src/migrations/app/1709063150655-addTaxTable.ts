import {MigrationInterface, QueryRunner} from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class addTaxTable1709063150655 implements MigrationInterface {
    name = 'addTaxTable1709063150655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`CREATE TABLE "${schema}"."tax" ("id" SERIAL NOT NULL, "taxName" character varying NOT NULL, "taxRate" character varying NOT NULL, "taxType" character varying NOT NULL, CONSTRAINT "PK_2c1e62c595571139e2fb0e9c319" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;
        await queryRunner.query(`DROP TABLE "${schema}"."tax"`);
    }

}
