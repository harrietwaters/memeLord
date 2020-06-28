import * as Canvas from 'canvas';
import { shuffle } from 'lodash';
import { Injectable } from '@nestjs/common';

import { DiscordClient, DiscordMessage } from '../../discord/discord-client';
import { Odds, TriggeredEvent, ReplyWithReturn } from '../../common/decorators';
import { WordSmith } from '../../utilities/word-smith';
import { ComplexResponse, TriggeredEventService } from '../../common/types';

@Injectable()
export class StudyBladeService implements TriggeredEventService {
    private readonly wordsmith: WordSmith;

    constructor(client: DiscordClient, wordSmith: WordSmith) {
        client.addTriggerEvent(this.response.bind(this));
        this.wordsmith = wordSmith;
    }

    @TriggeredEvent(msg => msg.length > 20)
    @Odds(1, 100)
    @ReplyWithReturn()
    public async response(cleanContent: string, message: DiscordMessage): Promise<ComplexResponse> {
        const nouns = shuffle(await this.wordsmith.getNouns(cleanContent.toLowerCase()));
        if (nouns.length < 3) return;
        const canvas = Canvas.createCanvas(680, 510);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('images/shrekBlade.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.font = '20px book-antiqua';
        ctx.fillStyle = '#000000';

        // Actually fill the text with a solid color
        ctx.fillText('When you were partying I\nstudied the', 10, 20);
        ctx.fillText('When you were having premarital\nsex I mastered the', 10, 85);
        ctx.fillText('While you wasted your days\nat the gym in pursuit of vanity I\ncultivated', 10, 145);
        ctx.fillText(
            'And now that the world is\non fire and the barbarians\nare at the gate you have the\naudacity to come to me\nfor help?',
            10,
            230
        );

        ctx.font = '24px sans-serif';
        ctx.fillStyle = '#9c0000';

        ctx.fillText(` ${nouns[0]}`, 125, 45);
        ctx.fillText(`${nouns[1]}`, 200, 110);
        ctx.fillText(`${nouns[2]}`, 120, 194);

        return {
            reply: `<@${message.author.id}>`,
            attachment: canvas.toBuffer()
        };
    }
}
