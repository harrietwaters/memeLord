import { Injectable } from '@nestjs/common';
import { TriggeredEventService } from '../../common/types';
import { DiscordClient } from '../../discord/discord-client';
import { TriggeredEvent, ReplyWithReturn } from '../../common/decorators';

@Injectable()
export class EdfService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @TriggeredEvent('edf')
    @ReplyWithReturn()
    public response(): string {
        return 'EDF! EDF!! EDF!!!';
    }
}
