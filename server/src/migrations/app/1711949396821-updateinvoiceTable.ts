import {MigrationInterface, QueryRunner} from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class updateinvoiceTable1711949396821 implements MigrationInterface {
    name = 'updateinvoiceTable1711949396821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`ALTER TABLE "${schema}"."invoices" ALTER COLUMN "addressId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

        await queryRunner.query(`ALTER TABLE "${schema}"."invoices" ALTER COLUMN "addressId" SET NOT NULL`);
    }

}
