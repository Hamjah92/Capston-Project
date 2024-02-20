import { MigrationInterface, QueryRunner } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class addSupplierTable1708160680848 implements MigrationInterface {
    name = 'addSupplierTable1708160680848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`CREATE TABLE "${schema}"."suppliers" ("id" SERIAL NOT NULL, "supplierId" character varying NOT NULL, "supplierName" character varying NOT NULL, "supplierPhone" character varying, "supplierEmail" character varying, "supplierGST" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_72715ca349897fe61381e321009" UNIQUE ("supplierId"), CONSTRAINT "UQ_5f10f69f32a61ac8fecf4f62c2f" UNIQUE ("supplierPhone"), CONSTRAINT "UQ_30ab8946610dbfaaab3e1ccc762" UNIQUE ("supplierEmail"), CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`DROP TABLE "${schema}"."suppliers"`);
    }

}
