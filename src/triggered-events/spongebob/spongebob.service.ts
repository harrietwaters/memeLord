import * as Canvas from 'canvas';
import { Injectable } from '@nestjs/common';
import { DiscordClient, DiscordMessage } from 'src/discord/discord-client';
import { TriggeredEvent, Odds, ReplyWithReturn } from 'src/common/decorators';
import { TriggeredEventService } from 'src/common/types';

@Injectable()
export class SpongebobService implements TriggeredEventService {
    constructor(client: DiscordClient) {
        client.addTriggerEvent(this.response.bind(this));
    }

    @Odds(1, 200)
    @TriggeredEvent(msg => msg.length > 1 && msg.length < 32)
    @ReplyWithReturn()
    public async response(cleanContent: string, message: DiscordMessage) {
        const mEsSaGge: string[] = [];
        for (let i = 0; i + 1 <= cleanContent.length; i += 2) {
            mEsSaGge.push(cleanContent[i].toLowerCase());

            if (cleanContent[i + 1] == null) continue;

            mEsSaGge.push(cleanContent[i + 1].toUpperCase());
        }

        const canvas = Canvas.createCanvas(680, 510);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('images/sPoNgEbOb.jpeg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.font = '72px impact';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';

        // Actually fill the text with a solid color
        const x = 340;
        const y = 475;
        const maxWidth = 650;
        ctx.textAlign = 'center';

        ctx.fillText(mEsSaGge.join(''), x, y, maxWidth);
        ctx.strokeText(mEsSaGge.join(''), x, y, maxWidth);

        return {
            reply: `<@${message.author.id}>`,
            attachment: canvas.toBuffer()
        };
    }
}
