import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class LoadDatabase1591835365358 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'point',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'authorId',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'messageId',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'point',
                    type: 'int',
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: 'sorting_hat_user',
            columns: [
                {
                    name: 'authorId',
                    type: 'varchar',
                    isNullable: false,
                    isPrimary: true,

                },
                {
                    name: 'lateHatTime',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'memeHouseId',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: 'meme_house',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'houseImage',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: 'shit_post',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'author',
                    type: 'varchar',
                    isNullable: false,
                    isPrimary: true,

                },
                {
                    name: 'messagaContent',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'dateTime',
                    type: 'integer',
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createForeignKey("point", new TableForeignKey({
            columnNames: ["authorId"],
            referencedColumnNames: ["authorId"],
            referencedTableName: "sorting_hat_user",
        }));

        await queryRunner.createForeignKey("sorting_hat_user", new TableForeignKey({
            columnNames: ["memeHouseId"],
            referencedColumnNames: ["id"],
            referencedTableName: "meme_house",
        }));

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
