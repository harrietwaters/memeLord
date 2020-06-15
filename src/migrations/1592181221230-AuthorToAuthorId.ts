import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuthorToAuthorId1592181221230 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('shit_post', 'author', 'authorId');
    }

    public async down(): Promise<void> {
        // Nothing to see here!
    }
}
