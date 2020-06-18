import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class FixDateTimeColumn1592504528307 implements MigrationInterface {
    name = 'FixDateTimeColumn1592504528307';

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (await queryRunner.hasColumn('shit_post', 'dateTime')) {
            await queryRunner.changeColumn(
                'shit_post',
                'dateTime',
                new TableColumn({
                    name: 'datetime',
                    type: 'bigint'
                })
            );
        }
    }

    public async down(): Promise<void> {
        // This is not the function you are looking for
    }
}
