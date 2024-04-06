import { MigrationInterface, QueryRunner } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class updatePurchaseTable1711692508128 implements MigrationInterface {
    name = 'updatePurchaseTable1711692508128'


    public async up(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP CONSTRAINT "UQ_59712045f2664aeb8a046928981"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "purchaseNumber"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "totalTaxInPer"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "totalTaxInAmount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "status" character varying`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP CONSTRAINT "FK_77980c752fdeb3689e318fde424"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ALTER COLUMN "supplierId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD CONSTRAINT "FK_77980c752fdeb3689e318fde424" FOREIGN KEY ("supplierId") REFERENCES "${schema}"."suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP CONSTRAINT "FK_77980c752fdeb3689e318fde424"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ALTER COLUMN "supplierId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD CONSTRAINT "FK_77980c752fdeb3689e318fde424" FOREIGN KEY ("supplierId") REFERENCES "${schema}"."suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP COLUMN "totalTaxInAmount"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "totalTaxInPer" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD "purchaseNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD CONSTRAINT "UQ_59712045f2664aeb8a046928981" UNIQUE ("purchaseNumber")`);
    }

}
