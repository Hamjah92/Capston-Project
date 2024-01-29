import {MigrationInterface, QueryRunner} from "typeorm";

export class init1666018751349 implements MigrationInterface {
    name = 'init1666018751349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supply_categories" ("id" integer NOT NULL, "supplyCategoryId" character varying NOT NULL, "supplyCategoryName" character varying NOT NULL, CONSTRAINT "PK_bb547d0471e63ebcf5d39d52df1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supply_types" ("id" integer NOT NULL, "supplyTypesId" character varying NOT NULL, "supplyTypesName" character varying NOT NULL, CONSTRAINT "UQ_620efcadc9ee80846ed71282662" UNIQUE ("supplyTypesId"), CONSTRAINT "PK_8b7e11c5743aacc774ee281623e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gst_chapter" ("id" SERIAL NOT NULL, "gstChapterName" character varying NOT NULL, "gstChapterTitle" character varying NOT NULL, CONSTRAINT "PK_722570690181855f6f765e9b800" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "countryCodeIso" character varying NOT NULL, "countryName" character varying NOT NULL, "countryNiceName" character varying NOT NULL, "countryCodeIso3" character varying, "countryCodeNum" integer, "countryCodePhone" character varying, CONSTRAINT "UQ_7d4defcf1a4740dc5c79ad16a22" UNIQUE ("countryCodeIso"), CONSTRAINT "UQ_2969947a5e70024bd3b8c0a4ebd" UNIQUE ("countryName"), CONSTRAINT "UQ_ee439ce9162c385aeede59d5dad" UNIQUE ("countryNiceName"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "units" ("id" SERIAL NOT NULL, "displayName" character varying NOT NULL, "unit" character varying NOT NULL, CONSTRAINT "UQ_893133a66753818cab4fa0dd746" UNIQUE ("unit"), CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pin_codes" ("id" SERIAL NOT NULL, "postOfficeName" character varying NOT NULL, "pinCode" character varying NOT NULL, "city" character varying NOT NULL, "district" character varying, "state" character varying, CONSTRAINT "UQ_8cd4d4187b58128c5c4df42f46c" UNIQUE ("pinCode"), CONSTRAINT "PK_0a89271581a42a88a89b59224e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "state" ("id" SERIAL NOT NULL, "stateName" character varying NOT NULL, "stateCode" character varying NOT NULL, "notes" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f97df79862ffbb31fe3d4d29792" UNIQUE ("stateCode"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hsn_code_details" ("id" character varying NOT NULL, "codeType" character varying NOT NULL, "hsnSacCode" character varying NOT NULL, "description" text, "industryId" character varying, "cgst" double precision, "sgstUtgst" double precision, "igst" double precision, "cess" double precision, "cessPerK" double precision, "gstChapterId" character varying, "effectiveFrom" character varying, "revisedDate" character varying, "rateRevision" character varying, "notes" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cf5e9ac294793757e9a1e59332b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "hashRt" character varying, CONSTRAINT "UQ_5b5d9635409048b7144f5f23198" UNIQUE ("email"), CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tenant"`);
        await queryRunner.query(`DROP TABLE "hsn_code_details"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "pin_codes"`);
        await queryRunner.query(`DROP TABLE "units"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "gst_chapter"`);
        await queryRunner.query(`DROP TABLE "supply_types"`);
        await queryRunner.query(`DROP TABLE "supply_categories"`);
    }

}
