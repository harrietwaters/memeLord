import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });
    const logger = app.get(Logger);
    app.useLogger(logger);
    await app.listen(process.env.PORT || 3000);
    logger.log('I am ready for memes!');
}
bootstrap();
