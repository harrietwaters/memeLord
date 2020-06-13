import { Injectable } from '@nestjs/common';
import { DiscordClient, DiscordMessage } from '../../discord/discord-client';
import { TriggeredEvent } from '../../common/decorators';
import { TriggeredEventService } from '../../common/types';

@Injectable()
export class WarrenSnakeService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @TriggeredEvent('warren')
    public async response(cleanMessage: string, message: DiscordMessage) {
        await message.react('🐍');
    }
}
