import { Module } from '@nestjs/common';
import { DiscordModule } from '../discord/discord.module';
import { TriggeredEventsController } from './triggered-events.controller';

@Module({
    // providers: [
    //     GundamLikeService,
    //     ButtBotService,
    //     CoolAbedService,
    //     DontAtMeService,
    //     EdfService,
    //     MrTrumpService,
    //     NoUService,
    //     PeteRatService,
    //     SmolDogService,
    //     WarrenSnakeService,
    //     WontDoService,
    //     SpongebobService,
    //     StudyBladeService,
    //     MemeCrimeService,
    //     SaveShitPostService,
    //     MemeScoreService,
    //     WhatIfWeKissed
    // ],
    imports: [DiscordModule],
    controllers: [TriggeredEventsController]
})
export class TriggeredEventsModule {}
