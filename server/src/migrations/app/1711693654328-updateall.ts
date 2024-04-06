import {MigrationInterface, QueryRunner} from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class updateall1711693654328 implements MigrationInterface {
    name = 'updateall1711693654328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`ALTER TABLE "${schema}"."purchaseDetails" DROP COLUMN "productQuantity"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchaseDetails" ADD "productQuantity" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "totalDiscount"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "totalDiscount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "totalTaxInAmount"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "totalTaxInAmount" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "totalTaxInAmount"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "totalTaxInAmount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "totalDiscount"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "totalDiscount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchaseDetails" DROP COLUMN "productQuantity"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchaseDetails" ADD "productQuantity" integer NOT NULL`);
    }

}
