import { Module } from '@nestjs/common';
import { AutoReactController } from './auto-react.controller';
import { MessageResponseController } from './message-response.controller';
import { PostTrackingController } from './post-tracking.controller';

@Module({
    controllers: [MessageResponseController, AutoReactController, PostTrackingController]
})
export class TriggeredEventsModule {}
