module.exports = {
    name: 'default',
    type: 'sqlite',
    database: 'db/database.sqlite',
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: 'typeorm_migrations',
    entities: ["dist/**/*.entity{.ts,.js}"],
    cli: { migrationsDir: 'src/migrations' },
}