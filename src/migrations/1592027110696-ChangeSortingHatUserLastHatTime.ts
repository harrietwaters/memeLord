import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeSortingHatUserLastHatTime1592027110696 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'sorting_hat_user',
            'lateHatTime',
            new TableColumn({
                name: 'lastSortTime',
                type: 'bigint',
                isNullable: false
            })
        );
    }

    public async down(): Promise<void> {}
}
