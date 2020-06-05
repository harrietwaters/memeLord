import { Injectable } from '@nestjs/common';
import { DiscordClient, DiscordMessage } from 'src/discord/discord-client';
import { TriggeredEvent } from 'src/common/decorators';
import { TriggeredEventService } from 'src/common/types';

@Injectable()
export class WontDoService implements TriggeredEventService{
    constructor(client: DiscordClient) {
        client.addTriggerEventListener(this.response);
    }

    @TriggeredEvent(['wont do', 'won\'t do', 'will not do'])
    public async response(cleanMessage: string, message: DiscordMessage) {
        await message.react('705153539185573938')
    }
}
