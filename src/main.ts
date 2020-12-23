import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { Connection } from 'typeorm';
import { DiscordTransport } from '@harold-waters/discord-nestjs-transport';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });
    const logger = app.get(Logger);
    app.useLogger(logger);

    const dbConnection = app.get(Connection);

    const microservice = app.connectMicroservice({
        strategy: new DiscordTransport({ token: process.env.CLIENT_TOKEN })
    });
    microservice.useLogger(logger);

    app.connectMicroservice(microservice);

    await dbConnection.runMigrations();
    await app.startAllMicroservicesAsync();
    await app.listen(process.env.PORT || 3000);

    logger.log('I am ready for memes!');
}
bootstrap();
