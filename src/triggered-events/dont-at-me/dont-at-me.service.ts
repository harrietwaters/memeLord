import { Injectable } from '@nestjs/common';
import { TriggeredEventService } from 'src/common/types';
import { DiscordMessage, DiscordClient } from 'src/discord/discord-client';
import { TriggeredEvent, ReplyWithReturn } from 'src/common/decorators';

@Injectable()
export class DontAtMeService implements TriggeredEventService  {
    constructor(client: DiscordClient) {
        client.addTriggerEventListener(this.response);
    }

    @TriggeredEvent((msg) => {
        return  msg.toLowerCase()
            .match(/^(dont at me|don\'t at me|don\'t \@ me|dont \@ me)/)
            ?.length > 0
    })
    @ReplyWithReturn()
    public response(cleanContent: string, message: DiscordMessage) {
        return `<@${message.author.id}> ur a little bitch`
    }
}
