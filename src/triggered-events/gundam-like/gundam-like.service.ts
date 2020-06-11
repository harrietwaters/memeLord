import { DiscordMessage, DiscordClient } from 'src/discord/discord-client';
import { TriggeredEvent } from 'src/common/decorators';
import { TriggeredEventService } from 'src/common/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GundamLikeService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @TriggeredEvent('gundam')
    public async response(cleanContent: string, message: DiscordMessage) {
        await message.react('👍');
    }
}
