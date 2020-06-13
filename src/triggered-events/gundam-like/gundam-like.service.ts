import { DiscordMessage, DiscordClient } from '../../discord/discord-client';
import { TriggeredEvent } from '../../common/decorators';
import { TriggeredEventService } from '../../common/types';
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
