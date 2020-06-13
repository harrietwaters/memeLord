import {readdirSync} from 'fs';
import {join} from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnectionOptions } from 'typeorm';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log('READY TO MEME!')
    const connectionOptions = await getConnectionOptions();
    console.dir(connectionOptions, { depth: 10});
    const dirContents = readdirSync(join('dist/src/models'))
    console.dir(dirContents, { depth: 10});

}
bootstrap();
