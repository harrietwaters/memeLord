import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class FixPointTable1592187551197 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey('point');
        await queryRunner.changeColumn(
            'point',
            'id',
            new TableColumn({
                name: 'id',
                type: 'integer',
                isGenerated: true,
                generationStrategy: 'increment',
                isPrimary: true
            })
        );
    }

    public async down(): Promise<void> {
        // Occupied!
    }
}
