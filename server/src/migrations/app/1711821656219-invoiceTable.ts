import { MigrationInterface, QueryRunner } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class invoiceTable1711821656219 implements MigrationInterface {
    name = 'invoiceTable1711821656219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`CREATE TABLE "${schema}"."invoices" ("id" SERIAL NOT NULL, "invoiceId" character varying NOT NULL, "customerId" character varying NOT NULL, "addressId" character varying NOT NULL, "invoiceDate" TIMESTAMP NOT NULL, "dueDate" TIMESTAMP NOT NULL, "totalDiscount" numeric(10,2) NOT NULL, "totalTaxInAmount" numeric(10,2) NOT NULL, "shippingCost" numeric(10,2) NOT NULL, "subTotal" numeric(10,2) NOT NULL, "netTotal" numeric(10,2) NOT NULL, "status" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_08f5378a442d3a5ef489d43eb3c" UNIQUE ("invoiceId"), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "${schema}"."invoiceDetails" ("id" SERIAL NOT NULL, "invoiceDetailsId" character varying NOT NULL, "invoiceId" integer NOT NULL, "productId" character varying NOT NULL, "productQuantity" numeric(10,2) NOT NULL, "productPrice" numeric(10,2) NOT NULL, "taxInPer" numeric(4,2) NOT NULL DEFAULT '0', "productTotal" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c99b004fff1eaf4658eef5e7208" UNIQUE ("invoiceDetailsId"), CONSTRAINT "PK_46a65cce8c7a7baafcef869eb58" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`DROP TABLE "${schema}"."invoiceDetails"`);
        await queryRunner.query(`DROP TABLE "${schema}"."invoices"`);
    }

}
