import { Injectable } from '@nestjs/common';
import { DiscordClient } from 'src/discord/discord-client';
import { TriggeredEvent, ReplyWithReturn, Odds } from 'src/common/decorators';
import { TriggeredEventService } from 'src/common/types';

@Injectable()
export class NoUService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @Odds(1, 5)
    @TriggeredEvent(msg => msg.toLowerCase().startsWith('you'))
    @ReplyWithReturn()
    public async response() {
        return 'no u';
    }
}
