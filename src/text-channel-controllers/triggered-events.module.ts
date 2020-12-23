import { Module } from '@nestjs/common';
import { DiscordModule } from '../discord/discord.module';
import { AutoReactController } from './auto-react.controller';
import { MessageResponseController } from './message-response.controller';
import { PostTrackingController } from './post-tracking.controller';

@Module({
    imports: [DiscordModule],
    controllers: [MessageResponseController, AutoReactController, PostTrackingController]
})
export class TriggeredEventsModule {}
