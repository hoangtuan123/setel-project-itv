import {MigrationInterface, QueryRunner} from "typeorm";

export class initSchema1619841485188 implements MigrationInterface {
    name = 'initSchema1619841485188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."payments" ("id" SERIAL NOT NULL, "order_id" integer NOT NULL, "amount" integer NOT NULL, "externalTransactionId" character varying(255) NOT NULL, CONSTRAINT "PK_da0c75943ce46ba8f224939c079" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "payments_pkey" ON "public"."payments" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."payments_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."payments"`);
    }

}
