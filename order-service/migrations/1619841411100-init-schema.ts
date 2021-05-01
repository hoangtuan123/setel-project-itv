import {MigrationInterface, QueryRunner} from "typeorm";

export class initSchema1619841411100 implements MigrationInterface {
    name = 'initSchema1619841411100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."orders" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "amount" integer NOT NULL, "status" character varying(10) NOT NULL DEFAULT 'created', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_171fc86d2df6b79ac4634d12b4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "orders_pkey" ON "public"."orders" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."orders_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."orders"`);
    }

}
