import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class FixShitPostColumns1592181615996 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('shit_post', 'messagaContent', 'messageContent');
        await queryRunner.addColumn(
            'shit_post',
            new TableColumn({
                name: 'imageHash',
                type: 'varchar'
            })
        );
    }

    public async down(): Promise<void> {
        // Nothing to see here!
    }
}
