import { Injectable } from '@nestjs/common';
import { TriggeredEventService } from 'src/common/types';
import { DiscordClient } from 'src/discord/discord-client';
import { TriggeredEvent, ReplyWithReturn } from 'src/common/decorators';

@Injectable()
export class EdfService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @TriggeredEvent(msg => msg.toLowerCase().includes('edf'))
    @ReplyWithReturn()
    public response() {
        return 'EDF! EDF!! EDF!!!';
    }
}
