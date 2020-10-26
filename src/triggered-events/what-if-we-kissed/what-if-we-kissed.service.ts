import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { Odds, ReplyWithReturn, TriggeredEvent } from '../../common/decorators';
import { TriggeredEventService } from '../../common/types';
import { DiscordClient, DiscordMessage } from '../../discord/discord-client';
import { WordSmith } from '../../utilities/word-smith';

@Injectable()
export class WhatIfWeKissed implements TriggeredEventService {
    private readonly wordSmith: WordSmith;

    constructor(client: DiscordClient, wordSmith: WordSmith) {
        client.addTriggerEvent(this.response.bind(this));
        this.wordSmith = wordSmith;
    }

    @TriggeredEvent()
    @Odds(1, 50)
    @ReplyWithReturn()
    public async response(cleanContent: string, message: DiscordMessage): Promise<string> {
        const locations: string[] = await this.wordSmith.getLocations(cleanContent);
        if (locations.length === 0) return;
        const kissingLocation: string = locations[Math.floor(Math.random() * locations.length)].toLowerCase();
        const preposition = this.wordSmith.getPreposition();
        const article = _.random(1, false) > 0 ? ' the ' : ' ';
        const kissingMessage: string = `\n😳 What if we kissed ${preposition}${article}${kissingLocation} 🙈`;
        return `<@${message.author.id}> ${kissingMessage}`;
    }
}
