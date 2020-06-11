import * as fs from 'fs';
import { DiscordClient, DiscordMessage } from 'src/discord/discord-client';
import { TriggeredEvent, ReplyWithReturn } from 'src/common/decorators';
import { TriggeredEventService } from 'src/common/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoolAbedService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response);
    }

    @TriggeredEvent(msg => {
        const coolCount = msg
            .toLowerCase()
            .split(/\s+/)
            .filter(word => word.includes('cool') || word.includes('🆒'));

        return coolCount.length > 2;
    })
    @ReplyWithReturn()
    public response(cleanContent: string, message: DiscordMessage) {
        const coolAbedGif = fs.readFileSync('images/coolAbed.gif');
        return {
            reply: `<@${message.author.id}>`,
            attachment: coolAbedGif
        };
    }
}
