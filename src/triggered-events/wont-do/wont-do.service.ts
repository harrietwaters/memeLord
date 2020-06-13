import { Injectable } from '@nestjs/common';
import { DiscordClient, DiscordMessage } from '../../discord/discord-client';
import { TriggeredEvent } from '../../common/decorators';
import { TriggeredEventService } from '../../common/types';

@Injectable()
export class WontDoService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @TriggeredEvent(['wont do', "won't do", 'will not do'])
    public async response(cleanMessage: string, message: DiscordMessage) {
        await message.react('705153539185573938');
    }
}
