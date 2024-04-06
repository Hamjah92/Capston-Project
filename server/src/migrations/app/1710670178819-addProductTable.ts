import { MigrationInterface, QueryRunner } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class addProductTable1710670178819 implements MigrationInterface {
    name = 'addProductTable1710670178819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`CREATE TABLE "${schema}"."products" ("id" SERIAL NOT NULL, "productId" character varying(150) NOT NULL, "productType" character varying NOT NULL, "productName" character varying NOT NULL, "productDescription" character varying, "productCode" character varying, "salesUnit" character varying, "salesPrice" character varying NOT NULL, "purchaseUnit" character varying, "purchasePrice" character varying NOT NULL, "discount" character varying NOT NULL DEFAULT '0', "discountIn" character varying NOT NULL DEFAULT '%', "taxesInclusive" boolean NOT NULL DEFAULT false, "salesTax" character varying, "purchaseTax" character varying, "openingQuantity" double precision NOT NULL DEFAULT '0', "lowStockReminder" double precision, "availableQuantity" double precision NOT NULL DEFAULT '0', "isFree" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_7b3b507508cd0f86a5b2e923459" UNIQUE ("productId"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`DROP TABLE "${schema}"."products"`);
    }

}
