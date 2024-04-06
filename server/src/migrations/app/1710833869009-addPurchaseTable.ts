import { MigrationInterface, QueryRunner } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class addPurchaseTable1710833869009 implements MigrationInterface {
    name = 'addPurchaseTable1710833869009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`CREATE TABLE "${schema}"."purchaseDetails" ("id" SERIAL NOT NULL, "purchaseDetailsId" character varying NOT NULL, "purchaseId" integer NOT NULL, "productId" character varying NOT NULL, "productQuantity" integer NOT NULL, "productPrice" numeric(10,2) NOT NULL, "discountOnItem" numeric(4,2) NOT NULL DEFAULT '0', "productTotal" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_04f3907ef54b2990b7ca377481e" UNIQUE ("purchaseDetailsId"), CONSTRAINT "PK_8a1470c2495b84cb75f3435f7d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "${schema}"."purchases" ("id" SERIAL NOT NULL, "purchaseId" character varying NOT NULL, "purchaseNumber" character varying NOT NULL, "purchaseDate" TIMESTAMP NOT NULL, "dueDate" TIMESTAMP NOT NULL, "discountInPer" integer NOT NULL DEFAULT '0', "discountAmount" integer NOT NULL DEFAULT '0', "shippingCost" numeric(10,2) NOT NULL, "listPrice" numeric(10,2) NOT NULL, "subTotal" numeric(10,2) NOT NULL, "netTotal" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "supplierId" integer, CONSTRAINT "UQ_611866f7af176a877f97cbb76a4" UNIQUE ("purchaseId"), CONSTRAINT "UQ_59712045f2664aeb8a046928981" UNIQUE ("purchaseNumber"), CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "${schema}"."products" ALTER COLUMN "discountIn" SET DEFAULT 'percentage'`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchaseDetails" ADD CONSTRAINT "FK_0c708b93c6bd0566c246df542ea" FOREIGN KEY ("purchaseId") REFERENCES "${schema}"."purchases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" ADD CONSTRAINT "FK_77980c752fdeb3689e318fde424" FOREIGN KEY ("supplierId") REFERENCES "${schema}"."suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`ALTER TABLE "${schema}"."purchases" DROP CONSTRAINT "FK_77980c752fdeb3689e318fde424"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."purchaseDetails" DROP CONSTRAINT "FK_0c708b93c6bd0566c246df542ea"`);
        await queryRunner.query(`ALTER TABLE "${schema}"."products" ALTER COLUMN "discountIn" SET DEFAULT '%'`);
        await queryRunner.query(`DROP TABLE "${schema}"."purchases"`);
        await queryRunner.query(`DROP TABLE "${schema}"."purchaseDetails"`);
    }

}
