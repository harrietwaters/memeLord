import { DiscordMessage, DiscordClient } from '../../discord/discord-client';
import { Odds, TriggeredEvent, ReplyWithReturn } from '../../common/decorators';
import { TriggeredEventService } from '../../common/types';
import { Injectable } from '@nestjs/common';
import { WordSmith } from '../../utilities/word-smith';

@Injectable()
export class ButtBotService implements TriggeredEventService {
    private readonly wordSmith: WordSmith;

    constructor(client: DiscordClient, wordSmith: WordSmith) {
        client.addTriggerEvent(this.response);
        this.wordSmith = wordSmith;
    }

    @TriggeredEvent()
    @Odds(1, 100)
    @ReplyWithReturn()
    public async response(cleanContent: string, message: DiscordMessage) {
        const nouns: string[] = await this.wordSmith.getNouns(message.cleanContent);
        if (nouns.length === 0) return;
        const buttNoun: string = nouns[Math.floor(Math.random() * nouns.length)];
        const buttMessage: string = cleanContent.replace(buttNoun, 'butt');
        return `<@${message.author.id}> ${buttMessage}`;
    }
}
