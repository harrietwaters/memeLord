import { MigrationInterface, QueryRunner } from 'typeorm';

export class LoadDatabase1591835365357 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "point" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "authorId" varchar NOT NULL, "messageId" varchar NOT NULL, "point" integer NOT NULL DEFAULT (850))`
        );
        await queryRunner.query(
            `CREATE TABLE "sorting_hat_user" ("authorId" varchar PRIMARY KEY NOT NULL, "lastHatTime" datetime NOT NULL, "memeHouseId" varchar NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "meme_house" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "houseImage" varchar NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "meme_lord_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "command" varchar NOT NULL, "triggerMessage" varchar NOT NULL, "triggerResponse" varchar NOT NULL, "dateTime" datetime NOT NULL, "attachmentUrl" varchar NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "shit_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "author" varchar NOT NULL, "messageContent" varchar NOT NULL, "dateTime" integer NOT NULL DEFAULT (1591756692088), "imageHash" varchar NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_point" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "authorId" varchar NOT NULL, "messageId" varchar NOT NULL, "point" integer NOT NULL DEFAULT (309))`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_point"("id", "authorId", "messageId", "point") SELECT "id", "authorId", "messageId", "point" FROM "point"`
        );
        await queryRunner.query(`DROP TABLE "point"`);
        await queryRunner.query(`ALTER TABLE "temporary_point" RENAME TO "point"`);
        await queryRunner.query(
            `CREATE TABLE "temporary_shit_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "author" varchar NOT NULL, "messageContent" varchar NOT NULL, "dateTime" integer NOT NULL DEFAULT (1591756692090), "imageHash" varchar NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_shit_post"("id", "author", "messageContent", "dateTime", "imageHash") SELECT "id", "author", "messageContent", "dateTime", "imageHash" FROM "shit_post"`
        );
        await queryRunner.query(`DROP TABLE "shit_post"`);
        await queryRunner.query(`ALTER TABLE "temporary_shit_post" RENAME TO "shit_post"`);
        await queryRunner.query(
            `CREATE TABLE "temporary_point" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "authorId" varchar NOT NULL, "messageId" varchar NOT NULL, "point" integer NOT NULL DEFAULT (309), CONSTRAINT "FK_01977d84dd4106f617b21c7215e" FOREIGN KEY ("authorId") REFERENCES "sorting_hat_user" ("authorId") ON DELETE NO ACTION ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_point"("id", "authorId", "messageId", "point") SELECT "id", "authorId", "messageId", "point" FROM "point"`
        );
        await queryRunner.query(`DROP TABLE "point"`);
        await queryRunner.query(`ALTER TABLE "temporary_point" RENAME TO "point"`);

        await queryRunner.query(`INSERT INTO meme_house VALUES(1,'House Toblerone','toblerone.jpeg')`);
        await queryRunner.query(`INSERT INTO meme_house VALUES(2,'House Dat Boi','datBoi.jpeg')`);
        await queryRunner.query(`INSERT INTO meme_house VALUES(3,'House Harkonnen','harkonnen.jpeg')`);
        await queryRunner.query(`INSERT INTO meme_house VALUES(4,'House uWu','uwu.jpeg')`);

        await queryRunner.query(`INSERT INTO sorting_hat_user VALUES('575141018027032599',1585628752469,4)`);
        await queryRunner.query(`INSERT INTO sorting_hat_user VALUES('663219490565390372',1585628775147,2)`);
        await queryRunner.query(`INSERT INTO sorting_hat_user VALUES('332053419588190218',1585628846474,3)`);
        await queryRunner.query(`INSERT INTO sorting_hat_user VALUES('502170892605063179',1585628852533,1)`);
        await queryRunner.query(`INSERT INTO sorting_hat_user VALUES('178628625208311809',1585629414286,3)`);
        await queryRunner.query(`INSERT INTO sorting_hat_user VALUES('492417918181703681',1585629767371,4)`);
        await queryRunner.query(`INSERT INTO sorting_hat_user VALUES('492490676962066432',1585629798674,2)`);
        await queryRunner.query(`INSERT INTO sorting_hat_user VALUES('457276447501975565',1585629888058,1)`);
        await queryRunner.query(`INSERT INTO sorting_hat_user VALUES('405158350805008385',1585632750794,2)`);
        await queryRunner.query(`INSERT INTO sorting_hat_user VALUES('689527478099640358',1585663937955,3)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
