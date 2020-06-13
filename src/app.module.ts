import { Module } from '@nestjs/common';
import { TerminusModule} from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from './discord/discord.module';
import { CommandsModule } from './commands/commands.module';
import { TriggeredEventsModule } from './triggered-events/triggered-events.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { HealthController } from './health/health.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DiscordModule,
        CommandsModule,
        TriggeredEventsModule,
        UtilitiesModule,
        TypeOrmModule.forRoot({
            autoLoadEntities: true
        }),
        TerminusModule,
    ],
    controllers: [AppController, HealthController],
    providers: [AppService],
    exports: []
})
export class AppModule {}
