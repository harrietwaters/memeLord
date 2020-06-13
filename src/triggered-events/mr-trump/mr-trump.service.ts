import { Injectable } from '@nestjs/common';
import { DiscordMessage, DiscordClient } from '../../discord/discord-client';
import { TriggeredEvent } from '../../common/decorators';
import { TriggeredEventService } from '../../common/types';

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
