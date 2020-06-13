import { Injectable } from '@nestjs/common';
import { DiscordClient } from '../../discord/discord-client';
import { TriggeredEvent, ReplyWithReturn, Odds } from '../../common/decorators';
import { TriggeredEventService } from '../../common/types';

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
