import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { Connection } from 'typeorm';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });
    const logger = app.get(Logger);
    const dbConnection = app.get(Connection);

    app.useLogger(logger);

    await dbConnection.runMigrations();
    await app.listen(process.env.PORT || 3000);

    logger.log('I am ready for memes!');
}
bootstrap();
