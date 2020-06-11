import { Injectable } from '@nestjs/common';
import { DiscordMessage, DiscordClient } from 'src/discord/discord-client';
import { TriggeredEvent } from 'src/common/decorators';
import { TriggeredEventService } from 'src/common/types';

@Injectable()
export class MrTrumpService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @TriggeredEvent('trump')
    public async response(cleanContent: string, message: DiscordMessage): Promise<void> {
        await message.react('🇺🇸');
    }
}
