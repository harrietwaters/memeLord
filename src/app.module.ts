import { Global, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TriggeredEventsModule } from './text-channel-controllers/triggered-events.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { HealthController } from './health/health.controller';
import { LoggerModule } from 'nestjs-pino';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
        LoggerModule.forRoot(),
        TriggeredEventsModule,
        UtilitiesModule,
        TypeOrmModule.forRoot({
            autoLoadEntities: true
        }),
        TerminusModule
    ],
    controllers: [AppController, HealthController],
    providers: [AppService],
    exports: []
})
export class AppModule {}
