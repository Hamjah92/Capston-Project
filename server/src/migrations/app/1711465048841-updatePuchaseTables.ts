import {MigrationInterface, QueryRunner} from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class updatePuchaseTables1711465048841 implements MigrationInterface {
    name = 'updatePuchaseTables1711465048841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "discountInPer"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "discountAmount"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "listPrice"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchaseDetails" ADD "taxInPer" numeric(4,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "totalDiscount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "totalTaxInPer" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "totalTaxInPer"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "totalDiscount"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchaseDetails" DROP COLUMN "taxInPer"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "listPrice" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "discountAmount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "discountInPer" integer NOT NULL DEFAULT '0'`);
    }

}
