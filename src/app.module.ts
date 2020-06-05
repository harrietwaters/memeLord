import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from './discord/discord.module';
import { CommandsModule } from './commands/commands.module';
import { TriggeredEventsModule } from './triggered-events/triggered-events.module';
import { UtilitiesModule } from './utilities/utilities.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DiscordModule,
        CommandsModule,
        TriggeredEventsModule,
        UtilitiesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
