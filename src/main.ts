import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnectionOptions } from 'typeorm';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log('READY TO MEME!')
    console.dir(getConnectionOptions, { depth: 10});
}
bootstrap();
