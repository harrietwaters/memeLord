import { Injectable } from '@nestjs/common';
import { DiscordClient } from '../../discord/discord-client';
import { TriggeredEvent, ReplyWithReturn } from '../../common/decorators';
import { TriggeredEventService } from '../../common/types';

@Injectable()
export class SmolDogService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @TriggeredEvent('smol')
    @ReplyWithReturn()
    public response(cleanContent: string): string {
        const words = cleanContent.split(/\s+/);
        const smolThing = words.indexOf('smol') + 1;

        if (!smolThing) return;

        return `SMOL ${words[smolThing].toUpperCase()}`;
    }
}
