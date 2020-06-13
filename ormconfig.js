module.exports = {
    name: 'default',
    type: 'sqlite',
    database: './db/database2.sqlite',
    migrations: ['./dist/migrations/*.js'],
    migrationsTableName: 'typeorm_migrations',
    entities: ['./dist/**/*.entity{.ts,.js}'],
    cli: { migrationsDir: './src/migrations' },
}