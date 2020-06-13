import { Injectable } from '@nestjs/common';
import { DiscordClient } from '../../discord/discord-client';
import { TriggeredEvent, ReplyWithReturn } from '../../common/decorators';
import { TriggeredEventService } from '../../common/types';

@Injectable()
export class SmolDogService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @TriggeredEvent('smol dog')
    @ReplyWithReturn()
    public response(): string {
        return 'SMOL DOG';
    }
}
