import {MigrationInterface, QueryRunner} from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class addCustomerTable1707521961415 implements MigrationInterface {
    name = 'addCustomerTable1707521961415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const {schema} = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`CREATE TABLE "${schema}"."customer_address" ("id" SERIAL NOT NULL, "addressId" character varying NOT NULL, "customerId" character varying NOT NULL, "businessAddress" character varying NOT NULL, "pinCode" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying, "addressType" character varying NOT NULL, "isDefault" boolean NOT NULL, CONSTRAINT "UQ_6ef8ae018c5db1b0759503e7b94" UNIQUE ("addressId"), CONSTRAINT "PK_23810fb397050d8ac37dae44ff6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "${schema}"."customers" ("id" SERIAL NOT NULL, "customerId" character varying NOT NULL, "customerCategory" character varying, "customerName" character varying NOT NULL, "customerPhone" character varying, "customerWhatsapp" character varying, "customerBusinessName" character varying, "customerEmail" character varying, "customerGST" character varying, "customerPAN" character varying, "status" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0d6a9c16d0c9bacffc0a784a186" UNIQUE ("customerId"), CONSTRAINT "UQ_77da1d2c59b147d5dda6252aad2" UNIQUE ("customerPhone"), CONSTRAINT "UQ_59abe14877800f6dad4ea01d7d5" UNIQUE ("customerWhatsapp"), CONSTRAINT "UQ_0c402e0b777a8beeca160f23351" UNIQUE ("customerEmail"), CONSTRAINT "UQ_6dcd81f33f0a9fdb75bcf8643ef" UNIQUE ("customerPAN"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const {schema} = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`DROP TABLE "${schema}"."customers"`);
        await queryRunner.query(`DROP TABLE "${schema}"."customer_address"`);
    }

}
