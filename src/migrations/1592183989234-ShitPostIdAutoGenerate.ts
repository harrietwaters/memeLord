import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ShitPostIdAutoGenerate1592183989234 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey('shit_post');
        await queryRunner.changeColumn(
            'shit_post',
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
        // Nuffin' here boss
    }
}
