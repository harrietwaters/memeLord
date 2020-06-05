import { Injectable } from '@nestjs/common';
import { DiscordClient } from 'src/discord/discord-client';
import { TriggeredEvent, ReplyWithReturn } from 'src/common/decorators';
import { TriggeredEventService } from 'src/common/types';

@Injectable()
export class SmolDogService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEventListener(this.response);
    }

    @TriggeredEvent('smol dog')
    @ReplyWithReturn()
    public response(): string {
        return 'SMOL DOG';
    }
}