import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixShitPostColumnsPK1592183325707 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey('shit_post');
        await queryRunner.createPrimaryKey('shit_post', ['id']);
    }

    public async down(): Promise<void> {
        // Go on! Move along!
    }
}
