import { Injectable } from '@nestjs/common';
import { DiscordClient, DiscordMessage } from 'src/discord/discord-client';
import { TriggeredEvent } from 'src/common/decorators';
import { TriggeredEventService } from 'src/common/types';

@Injectable()
export class PeteRatService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @TriggeredEvent('pete')
    public async response(cleanMessage: string, message: DiscordMessage) {
        await message.react('🐀');
        await message.react('🍞');
        await message.react('📈');
    }
}
